
import { Session } from "next-auth";
import { Company } from "@/../interfaces"; 
import { SortField, SortOrder } from "./watchListPresenter"; 
import { useRouter } from "next/navigation";
import { Stock } from "@/lib/model/slices/company/companyTypes";

export interface WatchlistTableProps {
  watchlistDetails: Company[] | null; 
  currentStock: Stock | null; 
  companies: Company[];
  expandedRow: string | null;
  toggleRow: (id: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  handleRemoveFromWatchlist: (stockId: string) => void;
  router: ReturnType<typeof useRouter>;
  handleNavigateToStockPage: (stockId: number) => void;
  handleSetSearchParam: (searchParam: string) => void;
}

export interface WatchListPresenterProps {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  watchlistTableProps: WatchlistTableProps;
}
