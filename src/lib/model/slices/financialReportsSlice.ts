// @/lib/features/financialReports/financialReportsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/model/store";

// TODO: Use this slice for recent reports inside the company page as well

interface FinancialReportsResponse {
  incomeStatment: {
    revenues: number;
    costOfGoodsSold: number;
    grossProfit: number;
    operatingExpenses: number;
    operatingProfit: number;
    netProfit: number;
  };
  balanceSheet: {
    assets: number;
    currentAssets: {
      cash: number;
      accountsReceivable: number;
      inventory: number;
    };
    fixedAssets: {
      properties: number;
      machinery: number;
      other: number;
    };
    liabilities: {
      shortTerm: number;
      longTerm: number;
    };
    equity: number;
  };
  cashFlow: {
    operatingActivities: number;
    investmentActivities: number;
    financingActivities: number;
  };
  stockId: string;
  stockName: string;
  eventDate: Date;
  eventTitle: string;
  url: string;
}

interface FinancialReportsState {
  reports: {
    message: string;
    data: FinancialReportsResponse[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: FinancialReportsState = {
  reports: {
    message: "",
    data: [],
  },
  loading: false,
  error: null,
};

export const fetchFinancialReports = createAsyncThunk(
  "financialReports/fetchFinancialReports",
  async ({
    random,
    ids,
    recent,
    numberOfYears,
    limit,
  }: {
    random: boolean;
    recent: boolean;
    numberOfYears?: number;
    limit?: number;
    ids?: number[];
  }) => {
    const url = "/api/financial-reports";
    const searchParams = new URLSearchParams();

    if (random) {
      searchParams.set("random", "true");
      limit && searchParams.set("numberOfRandomRecords", limit.toString());
    } else if (ids) {
      searchParams.set("ids", ids.join(","));
    } else if (recent) {
      searchParams.set("recent", "true");
      numberOfYears &&
        searchParams.set("numberOfYears", numberOfYears.toString());
      limit && searchParams.set("limit", limit.toString());
    } else {
      throw new Error("Invalid fetchFinancialReports arguments");
    }
    const response = await fetch(`${url}?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);

export const fetchRecentCompanyReports = createAsyncThunk(
  "financialReports/fetchRecentCompanyReports",
  async (companyId: number, thunkAPI) => {
    const searchParams = new URLSearchParams();
    searchParams.set("id", companyId.toString());

    const response = await fetch(
      `/api/financial-reports/${companyId}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue({
        message: data.message,
        status: response.status,
      });
    } else {
      return data;
    }
  }
);

const financialReportsSlice = createSlice({
  name: "financialReports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinancialReports.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { data, message } = action.payload;
        const sortedData = data.sort(
          (a: FinancialReportsResponse, b: FinancialReportsResponse) => {
            return (
              new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
            );
          }
        );
        state.reports = { message, data: sortedData };
      })
      .addCase(fetchFinancialReports.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch financial reports";
      })
      .addCase(fetchRecentCompanyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentCompanyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { data, message } = action.payload;
        const sortedData = data.sort(
          (a: FinancialReportsResponse, b: FinancialReportsResponse) => {
            return (
              new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
            );
          }
        );
        state.reports = { message, data: sortedData };
      })
      .addCase(fetchRecentCompanyReports.rejected, (state, action) => {
        state.loading = false;
        if (
          action.payload &&
          typeof action.payload === "object" &&
          "message" in action.payload
        ) {
          state.error =
            (action.payload as { message: string }).message ||
            "Failed to fetch recent company reports";
        } else {
          state.error = "Network error or unknown issue";
        }
      });
  },
});

export const selectFinancialReports = (state: RootState) =>
  state.financialReports;

export default financialReportsSlice.reducer;
