import { CompanyID } from "@/src/app/api/companies/dataTypes";

export interface Company {
  id: string;
  name: string;
  revenue: number;
  profit: number;
  description: string;
}

export interface CompanyState {
  companies: Company[];
  companyDetails: Company | null;
  loading: boolean;
  error: string;
  companiesIds: CompanyID[];
}

export interface AvanzaUrlParams {
  companyIds: number[];
  timePeriod?: string;
}

export interface ServerCompaniesUrlParams {
  name?: string;
  randomCount?: number;
}
