"use client";

import Link from "next/link";
import { TrendingUp, Eye, Info } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { SidebarProps } from "./sidebarTypes";

const Sidebar = (props: SidebarProps) => {

  const {
    pathname,
    session,
    status,
    recentlyVisited,
    isActive,
    navigateToStock,
  } = props;

  return (
    <div className="w-1/5 border-r p-4 overflow-auto flex-shrink-0">
      <nav className="space-y-2">
        <h2 className="text-lg font-semibold mb-2">Main Menu</h2>
        <Button
          variant={isActive("/company/overview") ? "default" : "ghost"}
          className={`w-full justify-start text-left ${isActive("/company/overview") ? "bg-black text-white hover:bg-black/90" : ""}`}
          asChild
        >
          <Link
            href="/company/overview"
            className="flex items-center px-4 py-2"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Overview
          </Link>
        </Button>

        {status === "authenticated" && (
          <Button
            variant={isActive("/account/user/watchlist") ? "default" : "ghost"}
            className={`w-full justify-start text-left ${isActive("/account/user/watchlist") ? "bg-black text-white hover:bg-black/90" : ""}`}
            asChild
          >
            <Link
              href="/account/user/watchlist"
              className="flex items-center px-4 py-2"
            >
              <Eye className="mr-2 h-4 w-4" />
              Watchlist
            </Link>
          </Button>
        )}
        <Button
          variant={isActive("/about-us") ? "default" : "ghost"}
          className={`w-full justify-start text-left ${isActive("/about-us") ? "bg-black text-white hover:bg-black/90" : ""}`}
          asChild
        >
          <Link href="/about-us" className="flex items-center px-4 py-2">
            <Info className="mr-2 h-4 w-4" />
            About Us
          </Link>
        </Button>
      </nav>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Recently Visited</h2>
        <div className="space-y-2">
          {recentlyVisited.map(
            (stock: { id: string; name: string; price: number }) => (
              <Button
                onClick={() =>
                  navigateToStock({
                    stockId: parseInt(stock.id),
                    searchParam: stock.name,
                  })
                }
                key={stock.id}
                variant="ghost"
                className="w-full justify-between text-left"
              >
                {/* <Link href={`/stock/${stock.id}`} className="flex items-center px-4 py-2"> */}
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {stock.name.length > 15
                    ? `${stock.name.slice(0, 20)} ...`
                    : stock.name}
                </div>
                <span className="text-green-500">
                  ${stock.price.toFixed(2)}
                </span>
                {/* </Link> */}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
