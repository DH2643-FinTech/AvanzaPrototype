"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/lib/model/store";
import { addRecentlyVisited } from "@/lib/model/slices/recentlyVisitedSlice";
import StockView from "@/app/company/stock/[id]/StockView";
import {
  setSearchParamTimeInterval,
} from "@/lib/model/slices/company/companySlice";
import { fetchCompanyDetails } from "@/lib/model/slices/company/companyAPI";
import { fetchRecentCompanyReports } from "@/lib/model/slices/financialReportsSlice";
import {StockSkeleton} from "./StockView";
import { useSession } from "next-auth/react";
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from "@/lib/model/slices/watchlistSlice";

const StockPresenter = () => {

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const stockId = useAppSelector((state) => state.company.currentStock?.id);
  const stockData = useAppSelector((state) => state.company.currentStock?.ohlc);
  const reports = useAppSelector((state) => state.financialReports);


  const stockGraphProps = {
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
  }, [watchlistStocks]);

  const isFavorite = watchlistStocks.includes(
    companies?.find((company: { _id: string; name: string }) => company._id === stockId)?.name || ""
  );

  const toggleFavorites = async () => {
    if(stockId === undefined) {
      return null;
    }
    if (isFavorite) {
      await dispatch(removeFromWatchlist(stockId));
    } else {
      await dispatch(addToWatchlist(stockId));
    }
    dispatch(fetchWatchlist());
  };

  const addToWatchlistProps = {
    stockId,
    isFavorite,
    toggleFavorites,
  }




  const { id } = useParams();
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const company = useAppSelector((state) => state.company);
  // const reports = useAppSelector((state) => state.financialReports);
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
      if (!searchParams) {
        const locSearchParam = localStorage.getItem("searchParams")
          ? JSON.parse(localStorage.getItem("searchParams") as string)
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
  }, []);

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
