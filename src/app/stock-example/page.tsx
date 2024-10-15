// @/src/app/stock/AAPL/page.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { addRecentlyVisited } from "@/src/lib/features/recentlyVisited/recentlyVisitedSlice";
import StockView from '@/src/views/StockView/StockView';

const AppleStockPage = () => {
    const dispatch = useAppDispatch();
    const { companyData, currentStock } = useAppSelector((state) => state.company);

    useEffect(() => {
        if (companyData && currentStock) {
            dispatch(addRecentlyVisited({
                id: companyData.id,
                name: companyData.name,
                price: currentStock.ohlc[currentStock.ohlc.length - 1].close
            }));
        }
    }, [companyData, currentStock, dispatch]);

    return <StockView />;
}
export default AppleStockPage;