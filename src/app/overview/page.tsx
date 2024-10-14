// src/app/overview/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchHighlightedStocks } from "@/src/lib/features/highlightedStocks/highlightedStocksSlice";
import { fetchFinancialReports } from "@/src/lib/features/financialReports/financialReportsSlice";
import OverviewView from '@/src/views/OverviewView/OverviewView';

export default function OverviewPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchHighlightedStocks());
        dispatch(fetchFinancialReports());
    }, [dispatch]);

    return <OverviewView />;
}