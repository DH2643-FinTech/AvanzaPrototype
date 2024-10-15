// @/src/components/RecentFinancialReports.tsx
import React, { useState } from 'react';
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

const RecentFinancialReports = () => {
    const reports = useAppSelector(selectFinancialReports);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(reports.length / reportsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-4">
            {currentReports.map((report, index) => (
                <Card key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{report.company}</h3>
                                <p className="text-sm text-gray-500">{report.title}</p>
                            </div>
                            <span className="text-sm text-gray-400">{report.date}</span>
                        </div>
                        <div className="mt-2 flex space-x-4">
                            <Badge variant="secondary">Revenue: {report.metrics.revenue}</Badge>
                            <Badge variant="secondary">Profit: {report.metrics.profit}</Badge>
                            <Badge variant="secondary">EPS: {report.metrics.eps}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            <strong>AI Verdict:</strong> {report.verdict}
                        </p>
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
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            aria-disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default RecentFinancialReports;
