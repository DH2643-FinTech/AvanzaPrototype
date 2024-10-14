import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '@/src/lib/features/company/companySlice';
import recentlyVisitedReducer from '@/src/lib/features/recentlyVisited/recentlyVisitedSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            company: companyReducer,
            recentlyVisited: recentlyVisitedReducer,
        },
    });
}

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;