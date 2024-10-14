import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '@/src/lib/features/company/companySlice';
import watchlistReducer from '@/src/lib/features/watchlist/watchlistSlice';
import recentlyVisitedReducer from '@/src/lib/features/recentlyVisited/recentlyVisitedSlice';


export const makeStore = () => {
    return configureStore({
        reducer: {
            company: companyReducer,
            watchlist: watchlistReducer,
            recentlyVisited: recentlyVisitedReducer,
        },
    });
}

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;