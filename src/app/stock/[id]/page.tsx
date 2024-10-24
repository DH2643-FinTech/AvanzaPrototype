"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { addRecentlyVisited } from "@/src/lib/features/recentlyVisited/recentlyVisitedSlice";
import StockView from "@/src/views/StockView/StockView";
import { setSearchParamTimeInterval } from "@/src/lib/features/company/companySlice";

const StockPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const company = useAppSelector((state) => state.company);
  const reports = useAppSelector((state) => state.financialReports);
  const { companyData, currentStock, loading, error } = company;
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

  return (
    <StockView
      reports={reports}
      company={company}
      setStockTimeInterval={handleSetStockTimeInterval}
    />
  );
};
export default StockPage;
