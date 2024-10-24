// src/app/overview/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchHighlightedStocks } from "@/src/lib/features/highlightedStocks/highlightedStocksSlice";
import { fetchFinancialReports, fetchRecentCompanyReports } from "@/src/lib/features/financialReports/financialReportsSlice";
import OverviewView from '@/src/views/OverviewView/OverviewView';
import { setSearchParamTimeInterval } from '@/src/lib/features/company/companySlice';
import { useAppSelector } from '@/src/lib/hooks/useAppSelector';
import { setSearchParamName } from '@/src/lib/features/company/companySlice';
import { useRouter } from 'next/navigation';
export default function OverviewPage() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleNavigateToStockPage = (stockId:number) =>{
      router.push(`/stock/${stockId}`);
      dispatch(fetchRecentCompanyReports(stockId));
    }

    const handleSetSearchParam = (searchParam: string) => {
        dispatch(setSearchParamName(searchParam));
    };

    const financialReports = useAppSelector((state) => state.financialReports);

    useEffect(() => {
        dispatch(fetchHighlightedStocks());
        dispatch(fetchFinancialReports({ random: true }));
    }, []);

    return <OverviewView navigateToStockPage ={handleNavigateToStockPage} setSearchParam={handleSetSearchParam} reports={financialReports}/>;
}