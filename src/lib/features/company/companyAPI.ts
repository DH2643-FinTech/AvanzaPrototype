
import { createAsyncThunk } from "@reduxjs/toolkit";
import { avanzaUrlBuilder, options, serverUrlBuilderCompanies } from "./urls";
import { Company, Stock, StockInfo } from "./companyTypes";
import { CompanyID } from "@/src/app/api/companies/dataTypes";

interface FetchCompanyDetailsParams {
  name: string;
  timePeriod?: string;
  randomCount?: number;
}

export const fetchCompanyDetails = createAsyncThunk(
  "company/fetchCompanies",
  async (
    arg: FetchCompanyDetailsParams,
    { dispatch, rejectWithValue, getState }
  ) => {
    try {

      const { name, randomCount, timePeriod } = arg;

      const url = serverUrlBuilderCompanies({ name, randomCount });
      const responseFromServer = await fetch(url);

      if (!responseFromServer.ok) {
        throw new Error("Failed to fetch companies");
      }

      const companyIds = await responseFromServer.json();

      //TODO: we may need to fetch details info about many companies at once!! Looping through all ids and fetch one by one or if we can solve it in a better way

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("companyId", JSON.stringify(companyIds)); // Pass the companyIds as a comma-separated string
      if (timePeriod) {
        headers.append("timePeriod", JSON.stringify(timePeriod));
      }

      const response = await fetch("http://localhost:3000/api/avanzaProxy", {
        method: "GET",
        headers: headers,
      });

      //TODO: return data
      const data = await response.json();
      const {metadata:{resolution:{availableResolutions, chartResolution}}, ohlc, from, to} = data;
    //   console.log("Response : ", data);
      return {
        id: "1",
        availableResolutions,
        chartResolution,
        ohlc,
        from,
        to,
      } as Stock;

    } catch (error: any) {
      console.error("Fetch error:", error);
      // return rejectWithValue((error as Error).message || 'Failed to fetch company details');
      return "error";
    }
  }
);

/**
 * DEPRECATED: Can be used for testing purposes
 */

interface FetchCompanyParams {
  name?: string;
  randomCount?: number;
}

export const fetchCompanyIdFromServer = createAsyncThunk<
  CompanyID[] | string,
  FetchCompanyParams
>("company/fetchCompanyIdFromServer", async (params: FetchCompanyParams) => {
  const { name, randomCount } = params;
  let url = "/api/companies";

  if (name) {
    url += `?name=${encodeURIComponent(name)}`;
  } else if (randomCount) {
    url += `?randomCount=${randomCount}`;
  }
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    const data = await response.json();
    // console.log("Response : ", data);

    return data as CompanyID[];
  } catch (error) {
    console.error("Fetch error:", error);
    return "error";
  }
});
