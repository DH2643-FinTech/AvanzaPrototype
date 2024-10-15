// TODO: Implement watchlist example

// 'use client';

// import { useEffect, useState } from 'react';
// import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
// import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
// import { fetchWatchlist, selectWatchlistStocks, selectWatchlistDetails, selectWatchlistLoading, selectWatchlistError } from "@/src/lib/features/watchlist/watchlistSlice";
// import WatchlistView from '@/src/views/WatchlistView/WatchlistView';

// const WatchlistExamplePage = () => {
//     const dispatch = useAppDispatch();
//     const watchlistStocks = useAppSelector(selectWatchlistStocks);
//     const watchlistDetails = useAppSelector(selectWatchlistDetails);
//     const loading = useAppSelector(selectWatchlistLoading);
//     const error = useAppSelector(selectWatchlistError);
//     const [isInitialLoad, setIsInitialLoad] = useState(true);

//     useEffect(() => {
//         if (isInitialLoad) {
//             console.log('Dispatching fetchWatchlist');
//             dispatch(fetchWatchlist());
//             setIsInitialLoad(false);
//         }
//     }, [dispatch, isInitialLoad]);

//     useEffect(() => {
//         console.log('State updated:', { watchlistStocks, watchlistDetails, loading, error });
//     }, [watchlistStocks, watchlistDetails, loading, error]);

//     if (isInitialLoad || loading) {
//         console.log('Loading state');
//         return <div>Loading...</div>;
//     }
//     if (error) {
//         console.error('Error state:', error);
//         return <div>Error: {error}</div>;
//     }
//     if (watchlistStocks.length === 0 || !watchlistDetails) {
//         console.log('No stocks in watchlist');
//         return <div>No stocks in watchlist</div>;
//     }

//     console.log('Rendering WatchlistView');
//     return <WatchlistView />;
// }

// export default WatchlistExamplePage;