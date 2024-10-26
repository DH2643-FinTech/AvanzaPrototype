// @/lib/features/highlightedStocks/highlightedStocksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store/store';

interface Stock {
    id: string;
    name: string;
    price: number;
    change: number;
}

interface HighlightedStocksState {
    stocks: Stock[];
    loading: boolean;
    error: string | null;
}

const initialState: HighlightedStocksState = {
    stocks: [],
    loading: false,
    error: null,
};

export const fetchHighlightedStocks = createAsyncThunk(
    'highlightedStocks/fetchHighlightedStocks',
    async () => {
        // Replace with actual API call
        const response = await fetch('/api/highlighted-stocks');
        const data = await response.json();
        return data;
    }
);

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