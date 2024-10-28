import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/model/store';
import { RecentlyVisitedState, RecentlyVisitedStock } from './recentlyVisitedTypes';

const initialState: RecentlyVisitedState = {
    stocks: [],
};

const recentlyVisitedSlice = createSlice({
    name: 'recentlyVisited',
    initialState,
    reducers: {
        addRecentlyVisited: (state, action: PayloadAction<RecentlyVisitedStock>) => {
            const existingIndex = state.stocks.findIndex(stock => stock.id === action.payload.id);
            if (existingIndex !== -1) {
                state.stocks.splice(existingIndex, 1);
            }
            state.stocks.unshift(action.payload);
            if (state.stocks.length > 6) {
                state.stocks.pop();
            }
        },
    },
});

export const { addRecentlyVisited } = recentlyVisitedSlice.actions;

export const selectRecentlyVisited = (state: RootState) => state.recentlyVisited.stocks;

export default recentlyVisitedSlice.reducer;