// @/lib/features/highlightedStocks/highlightedStocksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/model/store';
import { HighlightedStocksState } from './highlightedStockTypes';
import { fetchHighlightedStocks } from './highlightedStockThunks';



const initialState: HighlightedStocksState = {
    stocks: [],
    loading: false,
    error: null,
};



const highlightedStocksSlice = createSlice({
    name: 'highlightedStocks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHighlightedStocks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHighlightedStocks.fulfilled, (state, action) => {
                state.loading = false;
                state.stocks = action.payload;
            })
            .addCase(fetchHighlightedStocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch highlighted stocks';
            });
    },
});

export const selectHighlightedStocks = (state: RootState) => state.highlightedStocks.stocks;

export default highlightedStocksSlice.reducer;