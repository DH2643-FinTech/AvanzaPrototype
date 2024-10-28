"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/lib/model/store";
import { addRecentlyVisited } from "@/lib/model/slices/recently_visited/recentlyVisitedSlice";
import StockView from "@/app/company/stock/[id]/StockView";
import {
  setSearchParamTimeInterval,
} from "@/lib/model/slices/company/companySlice";
import { fetchCompanyDetails } from "@/lib/model/slices/company/companyThunks";
import { fetchRecentCompanyReports } from "@/lib/model/slices/financialReport/financialReportThunks";
import {StockSkeleton} from "./StockView";
import { useSession } from "next-auth/react";
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from "@/lib/model/slices/watchlist/watchlistThunks";
import { AddToWatchlistProps, StockGraphProps } from "./stockTypes";
import { isSessionStorageAvailable } from "@/lib/utils/utils";

const StockPresenter = () => {

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const stockId = useAppSelector((state) => state.company.currentStock?.id);
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc) || [];
  const reports = useAppSelector((state) => state.financialReports);


  const stockGraphProps: StockGraphProps = {
    status,
    stockData,
    reports,
  }


  // Add to favoirites button
  const watchlistStocks = useAppSelector(state => state.watchlist.stocks);
  const companies = useAppSelector(state => state.watchlist.watchlistDetails);

  useEffect(() => {
    if (!watchlistStocks.length) {
      dispatch(fetchWatchlist());
    }
  }, [watchlistStocks, dispatch]);

  const isFavorite = watchlistStocks.includes(
    companies?.find((company: { _id: string; name: string }) => company._id === stockId)?.name || ""
  );

  const toggleFavorites = async () => {
    if(stockId === undefined) {
      return;
    }
    if (isFavorite) {
      await dispatch(removeFromWatchlist(stockId));
    } else {
      await dispatch(addToWatchlist(stockId));
    }
    dispatch(fetchWatchlist());
  };

  const addToWatchlistProps: AddToWatchlistProps = {
    stockId: stockId ? parseInt(stockId) : undefined,
    isFavorite,
    toggleFavorites,
  }




  const { id } = useParams();
  const router = useRouter();
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const company = useAppSelector((state) => state.company);
  const { companyData, currentStock, loading, error, searchParams } = company;
  const handleSetStockTimeInterval = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    dispatch(
      setSearchParamTimeInterval({ startDate: startDate, endDate: endDate })
    );
  };

  useEffect(() => {
    if (companyData && currentStock) {
      dispatch(
        addRecentlyVisited({
          id: id as string,
          name: currentStock?.name,
          price: currentStock.ohlc[currentStock.ohlc.length - 1].close,
        })
      );
    }
  }, [companyData, currentStock, dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchParams && isSessionStorageAvailable()) {

        const locSearchParam = sessionStorage.getItem("searchParams")
          ? JSON.parse(sessionStorage.getItem("searchParams") as string)
          : null;
        if (locSearchParam) {
          await dispatch(
            fetchCompanyDetails({
              name: locSearchParam.name,
              id: locSearchParam.id,
              defaultTimePeriod: true,
              fromDateValid: false,
            })
          );
          await dispatch(fetchRecentCompanyReports(locSearchParam.id));
        } else {
          router.push("/company/overview");
        }
      }
      setFirstTimeLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return firstTimeLoading ? (
    <StockSkeleton />
  ) : (
    <StockView
      reports={reports}
      company={company}
      setStockTimeInterval={handleSetStockTimeInterval}
      stockGraphProps={stockGraphProps}
      addToWatchlistProps={addToWatchlistProps}
    />
  );
};
export default StockPresenter;
