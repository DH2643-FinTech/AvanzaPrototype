"use client";
import React from "react";
import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import StockCarousel from "@/src/components/StockCarousel";
import RecentFinancialReports from "@/src/components/RecentFinancialReports";
import StockGraph from "@/src/components/ui/charts/stockGraph";
import NewStockGraph from "@/src/components/ui/charts/newStockGraph";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";

const OverviewView = () => {
  const companyData = useAppSelector((state) => state.company.companyData);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          <div className="mb-8">
            <StockCarousel />
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Recent Financial Reports
          </h2>
          <div className="mb-6">
            {/* <RecentFinancialReports /> */}
            {/* <StockGraph /> */}
            <NewStockGraph />
          </div>
          <div>
            <div>
              <h2 className="font-bold py-2 text-[22px]">
                CEO: {companyData?.company?.ceo}
              </h2>
              <p className="text-[18px] mb-6 text-justify max-w-[1100px]">
                {companyData?.company?.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-[18px]">
                {companyData?.companyOwners?.owners.map((owner: any) => (
                  <div
                    key={owner.name}
                    className="border-b border-gray-200 py-2"
                  >
                    <h4 className="font-semibold">Name: {owner.name}</h4>
                    <h4 className="font-semibold">
                      Capital Percentage: {owner.percentOfCapital}
                    </h4>
                    <h4 className="font-semibold">
                      Vote Percentage: {owner.percentOfVotes}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewView;
