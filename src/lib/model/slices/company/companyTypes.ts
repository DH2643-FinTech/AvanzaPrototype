import { CompanyID } from "@/app/api/companies/dataTypes";
import { Company as otherCompany } from "@/../interfaces";


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
    name: string;
    availableResolutions: string[];
    chartResolution: string;
    ohlc: StockInfo[];
    from: string;
    to: string; 
}

export interface AvanzaData {
    stockData: Stock;
    companyData: CompanyData;
    id: string | undefined;
}

export interface CompanyState {
  companies: Company[];
  companyDetails: Company | null;
  loading: boolean;
  error: string;
  companiesIds: CompanyID[];
  currentStock: Stock | null;
  companyData: CompanyData | null;
  searchParams: {name: string, startDate?: string, endDate?: string, resolution?: string} | null;

}



/// company data
export interface CompanyData {
  stock: StockData;
  company: CompanyInfo;
  companyEvents: CompanyEvents;
  companyOwners: CompanyOwners;
  brokerTradeSummaries: BrokerTradeSummary[];
  dividends: Dividends;
  tradingTerms: TradingTerms;
  fundExposures: FundExposure[];
  esgView: ESGView;
  trades: any[];
  orderDepth: OrderDepth;
  orderDepthLevels: any[];
}

interface StockData {
  preferred: boolean;
  depositoryReceipt: boolean;
  numberOfShares: number;
}

export interface CompanyInfo {
  companyId: string;
  description: string;
  ceo: string;
  chairman: string;
  totalNumberOfShares: number;
  homepage: string;
}

interface CompanyEvents {
  events: Event[];
}

interface Event {
  date: string;
  type: 'INTERIM_REPORT' | 'ANNUAL_REPORT' | 'GENERAL_MEETING';
}

interface CompanyOwners {
  owners: Owner[];
  updated: string;
}

interface Owner {
  name: string;
  percentOfCapital: number;
  percentOfVotes: number;
}

interface BrokerTradeSummary {
  // Define properties as needed
}

interface Dividends {
  events: DividendEvent[];
  pastEvents: PastDividendEvent[];
}

interface DividendEvent {
  // Define properties as needed
}

interface PastDividendEvent {
  exDate: string;
  amount: number;
  currencyCode: string;
  dividendType: 'ORDINARY';
}

interface TradingTerms {
  collateralValue: number;
  marginRequirement: number;
  shortSellable: boolean;
  superInterestApproved: boolean;
}

interface FundExposure {
  orderbookId: string;
  name: string;
  exposure: number;
  instrumentType: 'FUND';
  countryCode: string;
  hasPosition: boolean;
}

interface ESGView {
  companyEqualityView: CompanyEqualityView;
  sustainabilityDevelopmentGoals: SustainabilityDevelopmentGoal[];
  productInvolvements: ProductInvolvement[];
}

interface CompanyEqualityView {
  womenOnBoard: number;
  womenInSeniorManagment: number;
  womenInWorkforce: number;
  womenOnBoardYear: number;
  womenInSeniorManagmentYear: number;
  womenInWorkforceYear: number;
}

interface SustainabilityDevelopmentGoal {
  year: number;
  value: number;
  name: string;
  title: string;
}

interface ProductInvolvement {
  year: number;
  value: number;
  name: string;
  title: string;
}

interface OrderDepth {
  receivedTime: number;
  levels: any[];
}

// AVANZA API
export interface AvanzaUrlParams {
  companyIds: number[];
  timePeriod?: string;
}

export interface ServerCompaniesUrlParams {
  name?: string;
  randomCount?: number;
}
