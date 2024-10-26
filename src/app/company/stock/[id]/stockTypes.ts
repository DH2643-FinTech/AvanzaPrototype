// StockPresenter.types.ts

import { CompanyData, CompanyInfo, CompanyState, StockInfo } from "@/lib/model/slices/company/companyTypes";
import { FinancialReportsState } from "@/lib/model/slices/financialReportsSlice";

// Define types for individual components, e.g., for stock data, reports, company details, etc.
// export interface StockData {
//     id: number;
//     ohlc: { close: number }[]; // Adjust structure as per actual data
//   }
  
//   export interface Report {
//     id: number;
//     year: number;
//     revenue: number;
//     profit: number;
//     // Add any other properties you have
//   }
  
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
  
//   export interface Company {
//     companyData: any; // Define this type in more detail based on your company's structure
//     currentStock: StockData | null;
//     loading: boolean;
//     error: boolean;
//     searchParams: any; // Define this as per actual structure
//   }
  