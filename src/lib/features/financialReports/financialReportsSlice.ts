// @/src/lib/features/financialReports/financialReportsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/src/lib/store/store';

// TODO: Use this slice for recent reports inside the company page as well

interface FinancialReport {
    company: string;
    title: string;
    date: string;
    metrics: {
        revenue: string;
        profit: string;
        eps: string;
    };
    verdict: string;
}

interface FinancialReportsResponse {
    incomeStatment:{
        revenues: number;
        costOfGoodsSold: number;
        grossProfit: number;
        operatingExpenses: number;
        operatingProfit: number;
        netProfit: number;
    }
    balanceSheet:{
        assets: number;
        currentAssets:{
            cash: number;
            accountsReceivable: number;
            inventory: number;
        }
        fixedAssets:{
            properties: number;
            machinery: number;
            other: number;
        }
        liabilities: {
            shortTerm: number;
            longTerm: number;
        };
        equity: number;
    }
    cashFlow:{
        operatingActivities: number;
        investmentActivities: number;
        financingActivities: number;
    }
    stockId: string;
    stockName: string;
    eventDate: Date;
    eventTitle: string;
    url: string;
}

interface FinancialReportsState {
    reports: {
        message : string;
        data: FinancialReportsResponse[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: FinancialReportsState = {
    reports: {
        message: '',
        data: [],
    },
    loading: false,
    error: null,
};

export const fetchFinancialReports = createAsyncThunk(
    'financialReports/fetchFinancialReports',
    async ({random, numOfRandom, ids} : {random: boolean, numOfRandom?: number, ids?: number[]}) => {
        // Replace with actual API call
        const url = "/api/financial-reports";
        const searchParams = new URLSearchParams();
        
        if (random) {
            searchParams.set('random', 'true');
            numOfRandom && searchParams.set('numberOfRandomRecords', numOfRandom.toString());
        }
        else if (ids) {
            searchParams.set('ids', ids.join(','));
        }
        else {
            throw new Error('Invalid fetchFinancialReports arguments');
        }
        const response = await fetch(`${url}?${searchParams.toString()}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            }
          });
        const data = await response.json();
        return data;
    }
);

const financialReportsSlice = createSlice({
    name: 'financialReports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFinancialReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFinancialReports.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.reports = action.payload;
            })
            .addCase(fetchFinancialReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch financial reports';
            });
    },
});

export const selectFinancialReports = (state: RootState) => state.financialReports;

export default financialReportsSlice.reducer;