// src/app/overview/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchHighlightedStocks } from "@/src/lib/features/highlightedStocks/highlightedStocksSlice";
import { fetchFinancialReports } from "@/src/lib/features/financialReports/financialReportsSlice";
import OverviewView from '@/src/views/OverviewView/OverviewView';
import { setSearchParamTimeInterval } from '@/src/lib/features/company/companySlice';
import { useAppSelector } from '@/src/lib/hooks/useAppSelector';
import { setSearchParamName } from '@/src/lib/features/company/companySlice';
export default function OverviewPage() {

    const dispatch = useAppDispatch();
    const handleSetStockTimeInterval = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
      dispatch(
        setSearchParamTimeInterval({ startDate: startDate, endDate: endDate })
      );
    };

    const handleSetSearchParam = (searchParam: string) => {
        dispatch(setSearchParamName(searchParam));
    };

    const companyData = useAppSelector((state) => state.company.companyData);

    useEffect(() => {
        dispatch(fetchHighlightedStocks());
        dispatch(fetchFinancialReports({ random: true }));
    }, []);

    return <OverviewView setSearchParam={handleSetSearchParam} setStockTimeInterval = {handleSetStockTimeInterval} companyData={companyData}/>;
}