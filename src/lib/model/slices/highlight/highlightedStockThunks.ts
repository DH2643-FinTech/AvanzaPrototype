import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHighlightedStocks = createAsyncThunk(
    'highlightedStocks/fetchHighlightedStocks',
    async () => {
        // Replace with actual API call
        const response = await fetch('/api/highlighted-stocks');
        const data = await response.json();
        return data;
    }
);