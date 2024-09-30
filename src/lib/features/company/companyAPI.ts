
import { createAsyncThunk } from "@reduxjs/toolkit";
import { avanzaUrlBuilder, options, serverUrlBuilderCompanies } from "./urls";
import { Company } from "./companyTypes";
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

      const avanzaUrls = avanzaUrlBuilder({
        companyIds,
        timePeriod,
      });

      //TODO: we may need to fetch details info about many companies at once!! Looping through all ids and fetch one by one or if we can solve it in a better way
      const response = await fetch(avanzaUrls[0], options);

      //TODO: return data
      const data = await response.json();

      return {
        id: "1",
        name: "Apple",
        revenue: 234,
        profit: 234,
        description: "string",
      } as Company;

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
