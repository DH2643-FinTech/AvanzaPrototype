
import { FinancialReportsState } from "@/lib/model/slices/financialReport/financialReportsSlice";

export interface OverviewViewProps {
    navigateToStockPage: (stockId: number) => void;
    setSearchParam: (searchParam: string) => void;
    reports: FinancialReportsState; 
  }
  