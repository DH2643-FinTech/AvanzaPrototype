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

interface FinancialReportsState {
    reports: FinancialReport[];
    loading: boolean;
    error: string | null;
}

const initialState: FinancialReportsState = {
    reports: [],
    loading: false,
    error: null,
};

export const fetchFinancialReports = createAsyncThunk(
    'financialReports/fetchFinancialReports',
    async () => {
        // Replace with actual API call
        const response = await fetch('/api/financial-reports');
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
            })
            .addCase(fetchFinancialReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(fetchFinancialReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch financial reports';
            });
    },
});

export const selectFinancialReports = (state: RootState) => state.financialReports.reports;

export default financialReportsSlice.reducer;