import { avanzaData } from './companyTypes';

// Temporary generic mock data
// TODO: Should have its own interface
export const mockAppleData: avanzaData = {
    stockData: {
        id: "AAPL",
        availableResolutions: ["1D", "1W", "1M", "3M", "1Y", "5Y"],
        chartResolution: "1D",
        ohlc: [
            { timestamp: "2023-10-01", open: 170.09, high: 173.54, low: 169.95, close: 172.88, totalVolumeTraded: 52987654 },
            { timestamp: "2023-10-02", open: 172.88, high: 175.20, low: 171.35, close: 174.91, totalVolumeTraded: 48765432 },
            { timestamp: "2023-10-03", open: 174.91, high: 176.89, low: 173.92, close: 175.84, totalVolumeTraded: 55432198 },
            { timestamp: "2023-10-04", open: 175.84, high: 177.78, low: 174.53, close: 176.65, totalVolumeTraded: 51234567 },
            { timestamp: "2023-10-05", open: 176.65, high: 178.21, low: 175.12, close: 177.57, totalVolumeTraded: 49876543 },
        ],
        from: "2023-10-01",
        to: "2023-10-05"
    },
    companyData: {
        id: "AAPL",
        name: "Apple Inc.",
        description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod.",
        marketCapital: "$2.67T",
        priceEarningsRatio: 28.5,
        directYield: 0.56,
        highestPrice: 198.23,
        lowestPrice: 124.17,
        reports: [
            { title: "Q4 2023 Earnings Report" },
            { title: "Q3 2023 Earnings Report" },
            { title: "Annual Report 2023" },
            { title: "Q2 2023 Earnings Report" },
        ]
    }
};
