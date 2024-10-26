import { createAsyncThunk } from "@reduxjs/toolkit";
import { Company } from "../company/companyTypes";

export const fetchWatchlist = createAsyncThunk(
    'watchlist/fetchWatchlist',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetch('/api/account/user/watchlist');
            if (!data.ok) {
                return rejectWithValue('Failed to fetch watchlist');
            }
            const json = await data.json() ;
            return json['watchlist'] as Company[];
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addToWatchlist = createAsyncThunk(
    'watchlist/addToWatchlist',
    async (stockId: string, { rejectWithValue }) => {
        try {
          const res = await fetch(`/api/account/user/watchlist/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: stockId }),
          });
      
          if (res.ok) {
            // console.log('Added to watchlist');
            return stockId;
          }
          rejectWithValue('Failed to add to watchlist');
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const removeFromWatchlist = createAsyncThunk(
    'watchlist/removeFromWatchlist',
    async (stockId: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/account/user/watchlist/`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: stockId }),
            });
        
            if (res.ok) {
              return stockId;
            }
            rejectWithValue('Failed to remove from watchlist');
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);