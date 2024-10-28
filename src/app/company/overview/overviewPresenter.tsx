// src/app/overview/page.tsx
'use client';
import React, { useEffect } from 'react';
import OverviewView from './overviewView';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/model/store';
import { setSearchParamName } from '@/lib/model/slices/company/companySlice';
import { fetchFinancialReports, fetchRecentCompanyReports } from "@/lib/model/slices/financialReport/financialReportThunks";

const OverviewPresenter = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleNavigateToStockPage = (stockId:number) =>{
      router.push(`/company/stock/${stockId}`);
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