export interface FinancialReportsResponse {
    incomeStatement: {
      revenues: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: number;
      operatingProfit: number;
      netProfit: number;
    };
    balanceSheet: {
      assets: number;
      currentAssets: {
        cash: number;
        accountsReceivable: number;
        inventory: number;
      };
      fixedAssets: {
        properties: number;
        machinery: number;
        other: number;
      };
      liabilities: {
        shortTerm: number;
        longTerm: number;
      };
      equity: number;
    };
    cashFlow: {
      operatingActivities: number;
      investmentActivities: number;
      financingActivities: number;
    };
    stockId: string;
    stockName: string;
    eventDate: Date;
    eventTitle: string;
    url: string;
  }
  
  export interface FinancialReportsState {
    reports: {
      message: string;
      data: FinancialReportsResponse[];
    };
    loading: boolean;
    error: string | null;
  }