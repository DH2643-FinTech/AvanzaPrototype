import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CompanyState,
  avanzaData,
} from "./companyTypes";
import { CompanyID } from "@/app/api/companies/dataTypes";
import { fetchCompanyDetails, fetchAllCompanyIds } from "./companyAPI";

const initialState: CompanyState = {
  companies: [],
  companyDetails: null,
  loading: false,
  error: "",
  companiesIds: [],
  currentStock: null, 
  companyData: null, 
  searchParams: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCurrentCompany: (state, action: PayloadAction<string>) => {
      state.companyDetails =
        state.companies.find((company:any) => company._id === action.payload) ||
        null;
    },
    setSearchParamResolution: (state, action: PayloadAction<string>) => {
      state.searchParams = {
        ...state.searchParams,
        resolution: action.payload,
      };
    },
    setSearchParamName:(state, action: PayloadAction<string>) => {
      state.searchParams = {
        ...state.searchParams,
        name: action.payload,

      };
      const companyIds = state.companiesIds;
      if(companyIds.length > 0){
        const id = companyIds.find(
          (company:any) => company.name === action.payload
        )?._id;
        if(id){
          localStorage.setItem("searchParams", JSON.stringify({id:id, name: action.payload}));
        }
      }
    },
    setSearchParamTimeInterval: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.searchParams = {
        ...state.searchParams,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    },
    setCompanies: (state, action: PayloadAction<CompanyID[]>) => {
      state.companiesIds = [];
      state.companiesIds.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCompanyDetails.fulfilled,
      (state, action: PayloadAction<avanzaData | string>) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.currentStock = action.payload.stockData;
          state.companyData = action.payload.companyData;

        }
      }
    );
    builder.addCase(fetchCompanyDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchAllCompanyIds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllCompanyIds.fulfilled,
      (state, action: PayloadAction<CompanyID[] | string>) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.companiesIds = [];
          state.companiesIds.push(...action.payload);
          localStorage.setItem("allCompanyIds", JSON.stringify(action.payload));
        }
      }
    );
    builder.addCase(fetchAllCompanyIds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch company IDs";
    });
  },
});

export const {
  setCurrentCompany,
  setSearchParamResolution,
  setSearchParamTimeInterval,
  setCompanies,
  setSearchParamName,
} = companySlice.actions;

export default companySlice.reducer;
