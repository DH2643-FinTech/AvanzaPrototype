// @/src/lib/features/watchlist/watchlistSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/lib/store/store';
import { mockWatchlistData } from './mockWatchlistData';
import { Company } from '@/src/lib/features/company/companyTypes';

interface WatchlistState {
    stocks: string[];  // Array of stock IDs
    watchlistDetails: Company[] | null;
    loading: boolean;
    error: string | null;
    lastUpdated: string | null;
}

const initialState: WatchlistState = {
    stocks: mockWatchlistData.map(item => item.stockData.id), // TODO: Change to [] when not using example
    watchlistDetails: mockWatchlistData.map(item => ({
        id: item.stockData.id,
        name: item.companyData.name,
        revenue: item.companyData.revenue,
        profit: item.companyData.profit,
        description: item.companyData.description
    })), // TODO: Change to null when not using example
    loading: false,
    error: null,
    lastUpdated: new Date().toISOString(),
};

export const fetchWatchlist = createAsyncThunk(
    'watchlist/fetchWatchlist',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate API call with mock data
            await new Promise(resolve => setTimeout(resolve, 1000));
            return mockWatchlistData;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addToWatchlist = createAsyncThunk(
    'watchlist/addToWatchlist',
    async (stockId: string, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 500));
            return stockId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const removeFromWatchlist = createAsyncThunk(
    'watchlist/removeFromWatchlist',
    async (stockId: string, { rejectWithValue }) => {
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 500));
            return stockId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlistStocks: (state, action: PayloadAction<string[]>) => {
            state.stocks = action.payload;
        },
        setWatchlistDetails: (state, action: PayloadAction<Company[]>) => {
            state.watchlistDetails = action.payload;
        },
        updateLastUpdated: (state) => {
            state.lastUpdated = new Date().toISOString();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWatchlist.fulfilled, (state, action) => {
                state.loading = false;
                state.stocks = action.payload.map(item => item.stockData.id);
                state.watchlistDetails = action.payload.map(item => ({
                    id: item.stockData.id,
                    name: item.companyData.name,
                    revenue: item.companyData.revenue,
                    profit: item.companyData.profit,
                    description: item.companyData.description
                }));
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchWatchlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(addToWatchlist.fulfilled, (state, action) => {
                state.stocks.push(action.payload);
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(removeFromWatchlist.fulfilled, (state, action) => {
                state.stocks = state.stocks.filter(id => id !== action.payload);
                state.lastUpdated = new Date().toISOString();
            });
    },
});

export const { setWatchlistStocks, setWatchlistDetails, updateLastUpdated } = watchlistSlice.actions;

export const selectWatchlistStocks = (state: RootState) => state.watchlist.stocks;
export const selectWatchlistDetails = (state: RootState) => state.watchlist.watchlistDetails;
export const selectWatchlistLoading = (state: RootState) => state.watchlist.loading;
export const selectWatchlistError = (state: RootState) => state.watchlist.error;
export const selectWatchlistLastUpdated = (state: RootState) => state.watchlist.lastUpdated;

export default watchlistSlice.reducer;