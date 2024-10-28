export interface Stock {
    id: string;
    name: string;
    price: number;
    change: number;
}

export interface HighlightedStocksState {
    stocks: Stock[];
    loading: boolean;
    error: string | null;
}