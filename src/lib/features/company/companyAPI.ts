import { createAsyncThunk } from "@reduxjs/toolkit";
import { avanzaUrlBuilder, options, serverUrlBuilderCompanies } from "./urls";
import { avanzaData, Company, Stock, StockInfo } from "./companyTypes";
import { CompanyID } from "@/src/app/api/companies/dataTypes";

interface FetchCompanyDetailsParams {
  name: string;
  timePeriod?: string;
  randomCount?: number;
  id?: string;
  fromDate?: Date;
  toDate?: Date;
  resolution?: string;
  defaultTimePeriod: boolean;
}

export const fetchCompanyDetails = createAsyncThunk(
  "company/fetchCompanies",
  async (
    arg: FetchCompanyDetailsParams,
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const { name, randomCount, timePeriod, id, fromDate, toDate, resolution, defaultTimePeriod  } = arg;

      //TODO: It is needed when we fixed the database migration. It fetches IDs from the database
      //   const url = serverUrlBuilderCompanies({ name, randomCount });
      //   const responseFromServer = await fetch(url);

      //   if (!responseFromServer.ok) {
      //     throw new Error("Failed to fetch companies");
      //   }

      //   const companyIds = await responseFromServer.json();

      //TODO: we may need to fetch details info about many companies at once!! Looping through all ids and fetch one by one or if we can solve it in a better way

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "companyId",
        JSON.stringify(
          {
            _id: id,
            name: name,
            fromDate: fromDate,
            toDate: toDate,
            resolution: resolution,
            defaultTimePeriod: defaultTimePeriod
          },
        )
      ); // Pass the companyIds as a comma-separated string
      if (timePeriod) {
        headers.append("timePeriod", JSON.stringify(timePeriod));
      }

      const response = await fetch("http://localhost:3000/api/avanzaProxy", {
        method: "GET",
        headers: headers,
      });

      //TODO: return data
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
          id: "1",
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
