import { CompanyID } from "@/src/app/api/companies/dataTypes";
import { Company as otherCompany } from "@/interfaces";


//TODO Fix with other company type
export interface Company extends otherCompany {
  
}

export interface StockInfo{
    timestamp: string;
    open: number;
    close: number;
    low: number;
    high:number;
    totalVolumeTraded: number;    
}

export interface Stock{
    id: string;
    availableResolutions: string[];
    chartResolution: string;
    ohlc: StockInfo[];
    from: string;
    to: string; 
}

export interface avanzaData {
    stockData: Stock;
    companyData: any;
}

export interface CompanyState {
  companies: Company[];
  companyDetails: Company | null;
  loading: boolean;
  error: string;
  companiesIds: CompanyID[];
  currentStock: Stock | null;
  companyData: any;
  searchParams: any;

}

export interface AvanzaUrlParams {
  companyIds: number[];
  timePeriod?: string;
}

export interface ServerCompaniesUrlParams {
  name?: string;
  randomCount?: number;
}
