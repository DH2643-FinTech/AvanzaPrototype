"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { addRecentlyVisited } from "@/src/lib/features/recentlyVisited/recentlyVisitedSlice";
import StockView from "@/src/views/StockView/StockView";
import {
  setSearchParamName,
  setSearchParamTimeInterval,
} from "@/src/lib/features/company/companySlice";
import { fetchCompanyDetails } from "@/src/lib/features/company/companyAPI";
import { fetchRecentCompanyReports } from "@/src/lib/features/financialReports/financialReportsSlice";

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
          name: companyData.name,
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
    <div>Loading...</div>
  ) : (
    <StockView
      reports={reports}
      company={company}
      setStockTimeInterval={handleSetStockTimeInterval}
    />
  );
};
export default StockPage;
