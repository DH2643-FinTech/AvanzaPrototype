"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { addRecentlyVisited } from "@/lib/features/recentlyVisited/recentlyVisitedSlice";
import StockView from "@/views/StockView/StockView";
import {
  setSearchParamName,
  setSearchParamTimeInterval,
} from "@/lib/features/company/companySlice";
import { fetchCompanyDetails } from "@/lib/features/company/companyAPI";
import { fetchRecentCompanyReports } from "@/lib/features/financialReports/financialReportsSlice";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Card, CardHeader } from "@/components/shadcn/card";
import CardContent from "@mui/material/CardContent/CardContent";

import StockSkeleton from "@/views/StockView/StockSkeleton";


const StockPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const company = useAppSelector((state) => state.company);
  const reports = useAppSelector((state) => state.financialReports);
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
          router.push("/overview");
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
    />
  );
};
export default StockPage;
