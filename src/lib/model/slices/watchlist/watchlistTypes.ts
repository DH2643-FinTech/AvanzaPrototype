import { Company } from "../company/companyTypes";

export interface WatchlistState {
    stocks: string[];  // Array of stock IDs
    watchlistDetails: Company[] | [];
    loading: boolean;
    error: string | null;
    lastUpdated: string | null;
}