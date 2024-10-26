export interface RecentlyVisitedStock {
    id: string;
    name: string;
    price: number;
}

export interface RecentlyVisitedState {
    stocks: RecentlyVisitedStock[];
}