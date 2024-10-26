"use client"

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, Eye, Info } from 'lucide-react'
import { Button } from "@/components/shadcn/button"
import { useAppSelector } from "@/lib//store/store"
import { selectRecentlyVisited } from "@/lib/store/slices/recentlyVisitedSlice"
import { useAppDispatch } from '../lib/store/store'
import { fetchRecentCompanyReports } from '../lib/store/slices/financialReportsSlice'
import { setSearchParamName } from '../lib/store/slices/company/companySlice'
import { useSession } from 'next-auth/react'
import { stat } from 'fs'

const Sidebar = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const recentlyVisited = useAppSelector(selectRecentlyVisited)
    const isActive = (path: string) => pathname === path;

    const router = useRouter();
    const dispatch = useAppDispatch();

    const navigateToStock = ({stockId, searchParam}: {stockId:number, searchParam:string}) => {
            router.push(`/stock/${stockId}`);
            dispatch(fetchRecentCompanyReports(stockId));
              dispatch(setSearchParamName(searchParam));
          
    }

    return (
        <div className="w-1/5 border-r p-4 overflow-auto flex-shrink-0">
            <nav className="space-y-2">
                <h2 className="text-lg font-semibold mb-2">Main Menu</h2>
                <Button
                    variant={isActive('/overview') ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${isActive('/overview') ? 'bg-black text-white hover:bg-black/90' : ''}`}
                    asChild
                >
                    <Link href="/overview" className="flex items-center px-4 py-2">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Overview
                    </Link>
                </Button>

                {status === 'authenticated' && (
                <Button
                    variant={isActive('/watchlist') ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${isActive('/watchlist') ? 'bg-black text-white hover:bg-black/90' : ''}`}
                    asChild
                >
                    <Link href="/watchlist" className="flex items-center px-4 py-2">
                        <Eye className="mr-2 h-4 w-4" />
                        Watchlist
                    </Link>
                </Button>)}
                <Button
                    variant={isActive('/about-us') ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${isActive('/about-us') ? 'bg-black text-white hover:bg-black/90' : ''}`}
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
                    {recentlyVisited.map((stock: { id: string, name: string, price: number }) => (
                        <Button onClick={() => navigateToStock({stockId: parseInt(stock.id), searchParam: stock.name})} key={stock.id} variant="ghost" className="w-full justify-between text-left" >
                            {/* <Link href={`/stock/${stock.id}`} className="flex items-center px-4 py-2"> */}
                                <div className="flex items-center">
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    {stock.name.length > 15 ? `${stock.name.slice(0, 20)} ...` : stock.name}
                                </div>
                                <span className="text-green-500">${stock.price.toFixed(2)}</span>
                            {/* </Link> */}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar