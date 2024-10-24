import { createAsyncThunk } from "@reduxjs/toolkit";
import { avanzaUrlBuilder, options, serverUrlBuilderCompanies } from "./urls";
import { avanzaData, Company, Stock, StockInfo } from "./companyTypes";
import { CompanyID } from "@/src/app/api/companies/dataTypes";

interface FetchCompanyDetailsParams {
  name: string;
  id?: string;
  fromDate?: Date;
  toDate?: Date;
  resolution?: string;
  defaultTimePeriod: boolean;
  fromDateValid: boolean;
}

export const fetchCompanyDetails = createAsyncThunk(
  "company/fetchCompanies",
  async (
    arg: FetchCompanyDetailsParams,
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const { name, id, fromDate, toDate, resolution, defaultTimePeriod,fromDateValid  } = arg;

      console.log("fetchCompanyDetails : ", name,  id, fromDate, toDate, resolution, defaultTimePeriod);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "companyInfo",
        JSON.stringify(
          {
            _id: id,
            name: name,
            fromDate: fromDate,
            toDate: toDate,
            resolution: resolution,
            defaultTimePeriod: defaultTimePeriod,
            fromDateValid: fromDateValid
          },
        )
      ); // Pass the companyIds as a comma-separated string

      const response = await fetch("/api/avanzaProxy", {
        method: "GET",
        headers: headers,
      });

      const resData = await response.json();
      const {
        data: {
          metadata: {
            resolution: { availableResolutions, chartResolution },
          },
          ohlc,
          from,
          to,
        },
        detailData,
        _id,
      } = resData;
      const stockInfo: avanzaData = {
        stockData: {
          id: String(id),
          name: name,
          availableResolutions,
          chartResolution,
          ohlc,
          from,
          to,
        },
        companyData: detailData,
        id,
      };
      return stockInfo as avanzaData;
    } catch (error: any) {
      console.error("Fetch error:", error);
      // return rejectWithValue((error as Error).message || 'Failed to fetch company details');
      return "error";
    }
  }
);

/**
 * Is used for the initial fetch of company IDs from the server
 */

interface FetchCompanyParams {
  name?: string;
  randomCount?: number;
}

export const fetchAllCompanyIds = createAsyncThunk<
  CompanyID[] | string
>("company/fetchAllCompanyIds", async () => {
  const url = "/api/companies";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    const data = await response.json();
    return data as CompanyID[];
  } catch (error) {
    console.error("Fetch error:", error);
    return "error";
  }
});
