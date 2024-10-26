"use client";

import { Button } from "../shadcn/button";
import { Eye, EyeOff } from "lucide-react";

export default function AddToFavoritesButton(props: any) {
  
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
