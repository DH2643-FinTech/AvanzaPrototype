import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import WatchlistView from "./watchlistView";
import { fetchWatchlist, removeFromWatchlist } from "@/lib/model/slices/watchlistSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/model/store";

export type SortField =
  | "_id"
  | "name"
  | "lastPrice"
  | "change"
  | "changePercent"
  | "totalNumberOfShares";
export type SortOrder = "asc" | "desc";

const WatchListPresenter = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.company.companies);


  const watchlistDetails = useAppSelector(
    (state) => state.watchlist.watchlistDetails
  );
  const currentStock = useAppSelector((state) => state.company.currentStock);


  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("_id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  const handleRemoveFromWatchlist = (stockId: string) => {
    dispatch(removeFromWatchlist(stockId));
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const watchlistTableProps = {
    watchlistDetails,
    currentStock,
    companies,
    expandedRow,
    toggleRow,
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    toggleSort,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRemoveFromWatchlist,
    router,
  }

  return (
    <WatchlistView
      //   signUp={handleSignUp}
      //   signIn={handleSignIn}
      status={status}
      watchlistTableProps={watchlistTableProps} session={session}    />
  );
};

export default WatchListPresenter;
