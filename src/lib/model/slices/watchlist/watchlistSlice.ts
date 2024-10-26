// @/lib/features/watchlist/watchlistSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/model/store';
import { Company } from '@/../interfaces';
import { WatchlistState } from './watchlistTypes';
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from './watchlistThunks';




const initialState: WatchlistState = {
    stocks: [],
    watchlistDetails: null,
    loading: false,
    error: null,
    lastUpdated: new Date().toISOString(),
};

// WIP: Only used for mock data


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
                state.stocks = action.payload.map(item => item.name);
                state.watchlistDetails = action.payload;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchWatchlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(addToWatchlist.fulfilled, (state, action) => {
                if(action.payload){
                  state.stocks.push(action.payload);
                state.lastUpdated = new Date().toISOString();
                }
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