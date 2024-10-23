// @/src/components/RecentFinancialReports.tsx
import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/shadcn/card";
import { Badge } from "@/src/components/shadcn/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/shadcn/pagination";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { selectFinancialReports } from "@/src/lib/features/financialReports/financialReportsSlice";

import { Skeleton } from "@/src/components/shadcn/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const RecentFinancialReports = (props: any) => {
  const { reports, loading, error } = useAppSelector(selectFinancialReports);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;
  // console.log(reports)
  // const data = reports.data;
  //  console.log(reports)
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.data.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const totalPages = Math.ceil(reports.data.length / reportsPerPage);
  // console.log(loading);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  if (loading == true) {
    // console.log("loading");
    // console.log("loading");
    return (
      <div className="space-y-4">
        {/* Show multiple skeletons for better UX */}
        {/* {Array.from({ length: reportsPerPage }).map((_, index) => (
          <SkeletonCard key={index} />
        ))} */}

        <img
          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1258.gif" />
      </div>
    );
  } 

  // if (error) {
  //   console.log(error);
  //   return <div>Error loading reports: {error}</div>;
  // }

    return (
      <div className="space-y-4">
        {currentReports.map((report: any, index: number) => (
          <Card
            key={index}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{report.stockName}</h3>
                  <p className="text-sm text-gray-500">{report.eventTitle}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {report.eventDate}
                </span>
              </div>
              <div className="mt-2 flex space-x-4">
                <Badge variant="secondary">
                  Revenue: {report.incomeStatement.revenues}
                </Badge>
                <Badge variant="secondary">
                  Profit: {report.incomeStatement.netProfit}
                </Badge>
                {/* <Badge variant="secondary">EPS: {report.metrics.eps}</Badge> */}
              </div>
              {/* <p className="mt-2 text-sm text-gray-600">
              <strong>AI Verdict:</strong> {report.verdict}
              </p> */}
            </CardContent>
          </Card>
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  
};

export default RecentFinancialReports;
