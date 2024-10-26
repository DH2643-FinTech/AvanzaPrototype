
import { FinancialReportsState } from "@/lib/model/slices/financialReportsSlice";

export interface OverviewViewProps {
    navigateToStockPage: (stockId: number) => void;
    setSearchParam: (searchParam: string) => void;
    reports: FinancialReportsState; 
  }
  