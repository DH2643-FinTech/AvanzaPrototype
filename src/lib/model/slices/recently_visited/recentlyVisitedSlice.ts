import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/model/store";
import {
  RecentlyVisitedState,
  RecentlyVisitedStock,
} from "./recentlyVisitedTypes";
import { isSessionStorageAvailable } from "@/lib/utils/utils";


export function loadStocksFromSessionStorage(): RecentlyVisitedStock[] {

    try{
        if(isSessionStorageAvailable()){   
            const storedData = sessionStorage.getItem("recentlyVisitedStocks");
            
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                return parsedData.stocks || [];
            }
        }
    }
    catch (error) {
        console.error("Error loading recently visited stocks from session storage", error);
    }
  
    return [];
  }
  
  // Function to save stocks to local storage with a timestamp
  function saveStocksToSessionStorage(stocks: RecentlyVisitedStock[]): void {
    const dataToStore = {
      stocks: stocks,
    };
  
    if (isSessionStorageAvailable()){

        sessionStorage.setItem("recentlyVisitedStocks", JSON.stringify(dataToStore));
    }
  }


const initialState: RecentlyVisitedState = {
  stocks: [],
};

const recentlyVisitedSlice = createSlice({
  name: "recentlyVisited",
  initialState,
  reducers: {
    addRecentlyVisited: (
      state,
      action: PayloadAction<RecentlyVisitedStock>
    ) => {
      const existingIndex = state.stocks.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.stocks.splice(existingIndex, 1);
      }
      state.stocks.unshift(action.payload);
      if (state.stocks.length > 6) {
        state.stocks.pop();
      }
      saveStocksToSessionStorage(state.stocks);
    },
    setRecentlyVisited: (state, action: PayloadAction<RecentlyVisitedStock[]>) => {
        state.stocks = action.payload;
    },
  },
});

export const { addRecentlyVisited, setRecentlyVisited } = recentlyVisitedSlice.actions;

export const selectRecentlyVisited = (state: RootState) =>
  state.recentlyVisited.stocks;

export default recentlyVisitedSlice.reducer;
