import { avanzaData } from '../company/companyTypes';

// Temporary generic mock data
export const mockWatchlistData: avanzaData[] = [
    {
        stockData: {
            id: "AAPL",
            availableResolutions: ["1D", "1W", "1M", "3M", "1Y", "5Y"],
            chartResolution: "1D",
            ohlc: [
                { timestamp: "2023-10-01", open: 170.09, high: 173.54, low: 169.95, close: 172.88, totalVolumeTraded: 52987654 },
                { timestamp: "2023-10-05", open: 176.65, high: 178.21, low: 175.12, close: 177.57, totalVolumeTraded: 49876543 },
            ],
            from: "2023-10-01",
            to: "2023-10-05"
        },
        companyData: {
            id: "AAPL",
            name: "Apple Inc.",
            description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
            revenue: 394328000000,
            profit: 99803000000,
            marketCapital: "$2.67T",
            priceEarningsRatio: 28.5,
            directYield: 0.56,
            highestPrice: 198.23,
            lowestPrice: 124.17,
            reports: [
                { title: "Q4 2023 Earnings Report" },
                { title: "Q3 2023 Earnings Report" },
                { title: "Annual Report 2023" },
            ]
        }
    },
    {
        stockData: {
            id: "MSFT",
            availableResolutions: ["1D", "1W", "1M", "3M", "1Y", "5Y"],
            chartResolution: "1D",
            ohlc: [
                { timestamp: "2023-10-01", open: 310.75, high: 315.20, low: 309.35, close: 312.91, totalVolumeTraded: 28765432 },
                { timestamp: "2023-10-05", open: 316.65, high: 318.21, low: 315.12, close: 317.57, totalVolumeTraded: 29876543 },
            ],
            from: "2023-10-01",
            to: "2023-10-05"
        },
        companyData: {
            id: "MSFT",
            name: "Microsoft Corporation",
            description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
            revenue: 198270000000,
            profit: 72361000000,
            marketCapital: "$2.3T",
            priceEarningsRatio: 32.2,
            directYield: 0.8,
            highestPrice: 366.78,
            lowestPrice: 241.51,
            reports: [
                { title: "Q2 2024 Earnings" },
                { title: "Q1 2024 Earnings" },
                { title: "Annual Report 2023" },
            ]
        }
    }
];

