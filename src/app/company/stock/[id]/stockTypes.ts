// StockPresenter.types.ts

import {  CompanyState, StockInfo } from "@/lib/model/slices/company/companyTypes";
import { FinancialReportsState } from "@/lib/model/slices/financialReport/financialReportTypes";
  
  export interface WatchlistDetails {
    _id: string;
    name: string;
  }
  
  export interface StockGraphProps {
    status: "authenticated" | "loading" | "unauthenticated";
    stockData: StockInfo[] | [];
    reports: FinancialReportsState;
  }
  
  export interface AddToWatchlistProps {
    stockId: number | undefined;
    isFavorite: boolean;
    toggleFavorites: () => Promise<void>;
  }
  
  export interface StockPresenterProps {
    reports: FinancialReportsState;
    company: CompanyState;
    setStockTimeInterval: (interval: { startDate: string; endDate: string }) => void;
    stockGraphProps: StockGraphProps ;
    addToWatchlistProps: AddToWatchlistProps;
  }
  
  