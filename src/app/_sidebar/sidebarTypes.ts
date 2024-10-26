// SidebarPresenter.types.ts

import { Session } from "next-auth";
import { RecentlyVisitedStock } from "@/lib/model/slices/recently_visited/recentlyVisitedTypes";

export interface SidebarProps {
  pathname: string;
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  recentlyVisited: RecentlyVisitedStock[];
  isActive: (path: string) => boolean;
  navigateToStock: (params: { stockId: number; searchParam: string }) => void;
}
