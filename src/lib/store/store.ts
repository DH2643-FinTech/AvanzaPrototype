import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import companyReducer, {
  setSearchParamName,
  setSearchParamTimeInterval,
} from "@/lib/store/slices/company/companySlice";
import { fetchCompanyDetails } from "@/lib/store/slices/company/companyAPI";
import watchlistReducer from "@/lib/store/slices/watchlistSlice";
import recentlyVisitedReducer from "@/lib/store/slices/recentlyVisitedSlice";
import highlightedStocksReducer from "@/lib/store/slices/highlightedStocksSlice";
import financialReportsReducer from "@/lib/store/slices/financialReportsSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setSearchParamName,
  effect: (action, listenerApi) => {
    const id = (listenerApi.getState() as RootState).company.companiesIds.find(
      (company) => company.name === action.payload
    )?._id;

    listenerApi.dispatch(
      fetchCompanyDetails({
        name: action.payload,
        id: id,
        defaultTimePeriod: true,
        fromDateValid: false,
      })
    );

  },
});

listenerMiddleware.startListening({
  actionCreator: setSearchParamTimeInterval,
  effect: (action, listenerApi) => {
    const currentStock = (listenerApi.getState() as RootState).company
      .currentStock;
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof makeStore>;
