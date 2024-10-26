// WatchListPresenter.types.ts

import { Session } from "next-auth";
import { Company } from "@/../interfaces"; // Adjust these imports based on your actual types
import { SortField, SortOrder } from "./watchListPresenter"; // Or define them here if they?re only used in this component
import { useRouter } from "next/navigation";
import { Stock } from "@/lib/model/slices/company/companyTypes";

export interface WatchlistTableProps {
  watchlistDetails: Company[] | null; // Adjust the type based on actual structure
  currentStock: Stock | null; // Adjust based on actual structure
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
}

export interface WatchListPresenterProps {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  watchlistTableProps: WatchlistTableProps;
}
