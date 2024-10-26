"use client";

import { Button } from "./shadcn/button";
import { Eye, EyeOff } from "lucide-react";

export default function AddToFavoritesButton(props: any) {

  //#region DEAD CODE
  // const dispatch = useAppDispatch();
  // const watchlistStocks = useAppSelector(state => state.watchlist.stocks);
  // const companies = useAppSelector(state => state.watchlist.watchlistDetails);

  // useEffect(() => {
  //   if (!watchlistStocks.length) {
  //     dispatch(fetchWatchlist());
  //   }
  // }, [dispatch, watchlistStocks]);

  // const isFavorite = watchlistStocks.includes(
  //   companies?.find((company: { _id: string; name: string }) => company._id === props.stockId)?.name || ""
  // );

  // const toggleFavorites = async () => {
  //   if(props.stockId === undefined) {
  //     return null;
  //   }
  //   if (isFavorite) {
  //     await dispatch(removeFromWatchlist(props.stockId));
  //   } else {
  //     await dispatch(addToWatchlist(props.stockId));
  //   }

  //   dispatch(fetchWatchlist());
  // };
//#endregion
  
const { stockId, isFavorite, toggleFavorites } = props;

  if (stockId === undefined) {
    return <Button disabled>invalid stock id...</Button>;
  }

  if (isFavorite === undefined) {
    return <Button disabled>Loading...</Button>;
  }

  return (
    <>
      {isFavorite ? (
        <EyeOff
          className="w-10 h-10"
          style={{ cursor: "pointer" }}
          onClick={toggleFavorites}
        />
      ) : (
        <Eye
          className="w-10 h-10"
          style={{ cursor: "pointer" }}
          onClick={toggleFavorites}
        />
      )}
    </>
  );
}
