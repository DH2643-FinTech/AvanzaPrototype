// src/app/overview/page.tsx
'use client';
import React, { useEffect } from 'react';
import { fetchHighlightedStocks } from "@/lib/store/slices/highlightedStocksSlice";
import { fetchFinancialReports, fetchRecentCompanyReports } from "@/lib/store/slices/financialReportsSlice";
import OverviewView from './overviewView';
import { useAppSelector, useAppDispatch } from '@/lib/store/store';
import { setSearchParamName } from '@/lib/store/slices/company/companySlice';
import { useRouter } from 'next/navigation';

const OverviewPresenter = () => {

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
        //TODO: highlighted stocks are not implemented yet - server needs to be able to find highlighted stocks. Maybe in future we can use this.
        // dispatch(fetchHighlightedStocks());
        dispatch(fetchFinancialReports({ random: false, recent: true, numberOfYears: 1, limit: 50 }));
    }, []);

    return <OverviewView navigateToStockPage ={handleNavigateToStockPage} setSearchParam={handleSetSearchParam} reports={financialReports}/>;
}

export default OverviewPresenter;