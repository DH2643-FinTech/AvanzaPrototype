// @/lib/features/financialReports/financialReportsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/model/store";
import { FinancialReportsResponse, FinancialReportsState } from "./financialReportTypes";
import { fetchFinancialReports, fetchRecentCompanyReports } from "./financialReportThunks";


const initialState: FinancialReportsState = {
  reports: {
    message: "",
    data: [],
  },
  loading: false,
  error: null,
};

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
