'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { fetchCompanyDetails } from "@/src/lib/features/company/companyAPI";
import { addRecentlyVisited } from "@/src/lib/features/recentlyVisited/recentlyVisitedSlice";
import StockView from '@/src/views/StockView/StockView';
import { setSearchParamTimeInterval } from '@/src/lib/features/company/companySlice';

const StockPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { companyData, currentStock, loading, error } = useAppSelector((state) => state.company);
    const handleSetStockTimeInterval = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
        dispatch(
          setSearchParamTimeInterval({ startDate: startDate, endDate: endDate })
        );
      };

    useEffect(() => {
        // if (id) {
        //     dispatch(fetchCompanyDetails({ name: id as string }));
        //     console.log("fetchCompanyDetailsHandler")
        // }
    }, [id, dispatch]);

    useEffect(() => {
        // if (companyData && currentStock) {
        //     dispatch(addRecentlyVisited({
        //         id: id as string,
        //         name: companyData.name,
        //         price: currentStock.ohlc[currentStock.ohlc.length - 1].close
        //     }));
        // }
    }, [companyData, currentStock, dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!companyData || !currentStock) return <div>No data available</div>;

    return <StockView setStockTimeInterval = {handleSetStockTimeInterval} />;
}
export default StockPage;