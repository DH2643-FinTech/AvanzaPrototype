export interface Company {
    id: string;
    name: string;
    revenue: number;
    profit: number;
    description: string;
}

export interface CompanyState {
    companies: Company[];
    companyDetails: Company | null;
    loading: boolean;
    error: string;
}