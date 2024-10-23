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
import { useRouter } from "next/navigation";

const RecentFinancialReports = (props: any) => {
  const router = useRouter();
  const { reports, loading, error } = useAppSelector(selectFinancialReports);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.data.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const totalPages = Math.ceil(reports.data.length / reportsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecentReport = (report: any) => {
    router.push(`/stock/${report.stockId}`);
    props.setSearchParam(report.stockName);
    // console.log(report);
  };

  return loading ? (
    Array.from({ length: reportsPerPage }).map(() => (
      <div key={crypto.randomUUID()} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[550px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[550px]" />
          <Skeleton className="h-4 w-[500px]" />
        </div>
      </div>
    ))
  ) : (
    <div className="space-y-4">
      {currentReports.map((report: any) => (
        <Card
          key={report.id}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <CardContent onClick={()=>handleRecentReport(report)} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{report.stockName}</h3>
                <p className="text-sm text-gray-500">{report.eventTitle}</p>
              </div>
              <span className="text-sm text-gray-400">{report.eventDate}</span>
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
