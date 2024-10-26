// OverviewPresenter.types.ts

import { FinancialReportsState } from "@/lib/model/slices/financialReportsSlice";

export interface OverviewViewProps {
    navigateToStockPage: (stockId: number) => void;
    setSearchParam: (searchParam: string) => void;
    reports: FinancialReportsState; // Replace `any` with the actual type for `financialReports`
  }
  