import { createAsyncThunk } from "@reduxjs/toolkit";

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
      const url = "/api/companies/financial-reports";
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
        `/api/companies/financial-reports/${companyId}?${searchParams.toString()}`,
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