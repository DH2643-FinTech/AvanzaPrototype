"use client";
import React, { useEffect } from "react";
import StockCarousel from "@/src/components/StockCarousel";
import RecentFinancialReports from "@/src/components/RecentFinancialReports";
import NewStockGraph from "@/src/components/ui/charts/newStockGraph";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchFinancialReports } from "@/src/lib/features/financialReports/financialReportsSlice";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";

const OverviewView = (props:any) => {

  return (
    <div className="flex border w-4/5 flex-col h-screen bg-white">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          {/* <div className="mb-8">
            <StockCarousel />
          </div> */}
          <h2 className="text-2xl font-semibold mb-4">
            Recent Financial Reports
          </h2>
          <div className="mb-6">
            <RecentFinancialReports navigateToStockPage = {props.navigateToStockPage} setSearchParam={props.setSearchParam} reports = {props.reports} /> 
          </div> 
        </main>
      </div>
    </div>
  );
};

export default OverviewView;
