'use client';

import { useEffect, useState } from "react";
import { Button } from "./shadcn/button";
import { addToWatchlist, fetchWatchlist, removeFromWatchlist, selectWatchlistStocks } from "../lib/features/watchlist/watchlistSlice";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";

export default function AddToFavoritesButton(props: { stockId: string | undefined }) {
 
  const dispatch = useAppDispatch();
  const watchlistStocks = useAppSelector(state => state.watchlist.stocks);
  const companies = useAppSelector(state => state.watchlist.watchlistDetails);

  useEffect(() => {
    if (!watchlistStocks.length) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, watchlistStocks]);

  const isFavorite = watchlistStocks.includes(
    companies?.find(company => company._id === props.stockId)?.name || ""
  );

  const toggleFavorites = async () => {
    if(props.stockId === undefined) {
      return null;
    }
    if (isFavorite) {
      await dispatch(removeFromWatchlist(props.stockId));
    } else {
      await dispatch(addToWatchlist(props.stockId));
    }

    dispatch(fetchWatchlist());
  };

  if(props.stockId === undefined) {
    return <Button disabled>invalid stock id...</Button>;
  }

  if (isFavorite === undefined) {
    return <Button disabled>Loading...</Button>;
  }

  return (
    <Button onClick={toggleFavorites}>
      {isFavorite ? "Remove from watchlist" : "Add to watchlist"}
    </Button>
  );
}
