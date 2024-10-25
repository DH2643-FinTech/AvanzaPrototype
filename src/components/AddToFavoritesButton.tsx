'use client';

import { useEffect, useState } from "react";
import { Button } from "./shadcn/button";
import { addToWatchlist, fetchWatchlist, removeFromWatchlist, selectWatchlistStocks } from "../lib/features/watchlist/watchlistSlice";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { Eye, EyeOff } from "lucide-react";

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
    companies?.find((company: { _id: string; name: string }) => company._id === props.stockId)?.name || ""
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
    // <Star onClick={toggleFavorites} />
    // <Cctv onClick={toggleFavorites}/>
    // <Star >
    // <Button onClick={toggleFavorites}>
    //   {isFavorite ? "Remove from watchlist" : "Add to watchlist"}
    // </Button>    
    // <Button className="" >
    <>
      {isFavorite ?   <EyeOff className="w-10 h-10" style={{cursor: 'pointer'}}  onClick={toggleFavorites} /> : <Eye className="w-10 h-10" style={{cursor: 'pointer'}}  onClick={toggleFavorites}/>}
    </>
    // </Button>
    
    // <Star />

    // <div  style={{ cursor: 'pointer' }}>

    // <Eye />

    // <EyeClosed />

  //   <div onClick={toggleFavorites} style={{ cursor: 'pointer' }}>
  //   {isFavorite ? (
  //     <Eye style={{ color: 'black' }} /> // When favorited, the Eye icon is black
  //   ) : (
  //     <EyeClosed style={{ color: 'white', border: '2px solid black' }} /> // When not favorited, the EyeClosed icon has a border and white fill
  //   )}
  // </div>

    // <Cctv
    // onClick={toggleFavorites}
    //   className={`icon ${isFavorite ? 'bg-black text-white' : 'bg-white border border-black'}`}
    //   style={{
    //     color: isFavorite ? 'black' : 'white',
    //     border: isFavorite ? 'none' : '2px solid black',
    //     padding: '4px', // Optional: Add padding for visual effect
    //   }}
    // />
  // </div>

  );
}
