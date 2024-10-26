
import { FinancialReportsState } from "@/lib/model/slices/financialReport/financialReportTypes";

export interface OverviewViewProps {
    navigateToStockPage: (stockId: number) => void;
    setSearchParam: (searchParam: string) => void;
    reports: FinancialReportsState; 
  }
  