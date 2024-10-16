import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import companyReducer, {
  setSearchParamStartDate,
  setSearchParamResolution,
  setSearchParamEndDate,
  setSearchParamTimeInterval,
} from "@/src/lib/features/company/companySlice";
import { fetchCompanyDetails } from "@/src/lib/features/company/companyAPI";
import watchlistReducer from "@/src/lib/features/watchlist/watchlistSlice";
import recentlyVisitedReducer from "@/src/lib/features/recentlyVisited/recentlyVisitedSlice";
import highlightedStocksReducer from "@/src/lib/features/highlightedStocks/highlightedStocksSlice";
import financialReportsReducer from "@/src/lib/features/financialReports/financialReportsSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const listenerMiddleware = createListenerMiddleware();

  listenerMiddleware.startListening({
    actionCreator: setSearchParamTimeInterval,
    effect: (action, listenerApi) => {
      console.log("Lister is listening to ", action.payload);
      const currentStock = (listenerApi.getState() as RootState).company.currentStock;
      if (currentStock) {
        const { id, name } = currentStock;
        listenerApi.dispatch(
          fetchCompanyDetails({
            id: String(id),
            name: name,
            toDate: new Date(action.payload.endDate),
            defaultTimePeriod: false,
            fromDate: new Date(action.payload.startDate),
            fromDateValid: true,
          })
        );
      }
    },
  });

export const makeStore = () => {
  return configureStore({
    reducer: {
      company: companyReducer,
      watchlist: watchlistReducer,
      recentlyVisited: recentlyVisitedReducer,
      highlightedStocks: highlightedStocksReducer,
      financialReports: financialReportsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
