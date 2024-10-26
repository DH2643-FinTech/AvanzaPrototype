"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from "@/lib/model/store";
import { addRecentlyVisited } from "@/lib/model/slices/recentlyVisitedSlice";
import StockView from "@/app/stock/[id]/StockView";
import {
  setSearchParamName,
  setSearchParamTimeInterval,
} from "@/lib/model/slices/company/companySlice";
import { fetchCompanyDetails } from "@/lib/model/slices/company/companyAPI";
import { fetchRecentCompanyReports } from "@/lib/model/slices/financialReportsSlice";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Card, CardHeader } from "@/components/shadcn/card";
import CardContent from "@mui/material/CardContent/CardContent";
import {StockSkeleton} from "./StockView";

const StockPresenter = () => {
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
export default StockPresenter;
