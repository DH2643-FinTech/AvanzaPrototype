"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from "@/lib/model/store"
import { selectRecentlyVisited } from "@/lib/model/slices/recentlyVisitedSlice"
import { useAppDispatch } from '../../lib/model/store'
import { fetchRecentCompanyReports } from '../../lib/model/slices/financialReportsSlice'
import { setSearchParamName } from '../../lib/model/slices/company/companySlice'
import { useSession } from 'next-auth/react'
import SidebarView from './sidebarView'

// import Link from 'next/link'
// import { stat } from 'fs'
// import { TrendingUp, Eye, Info } from 'lucide-react'
// import { Button } from "@/components/shadcn/button"

const SidebarPresenter = () => {

    const pathname = usePathname();
    const { data: session, status } = useSession();
    const recentlyVisited = useAppSelector(selectRecentlyVisited)
    const isActive = (path: string) => pathname === path;

    const router = useRouter();
    const dispatch = useAppDispatch();

    const navigateToStock = ({stockId, searchParam}: {stockId:number, searchParam:string}) => {
            router.push(`/company/stock/${stockId}`);
            dispatch(fetchRecentCompanyReports(stockId));
              dispatch(setSearchParamName(searchParam));
          
    }

    
    const sidebarProps = {
        pathname,
        session,
        status,
        recentlyVisited,
        isActive,
        navigateToStock
    }


  return (
    <SidebarView {...sidebarProps} />
  )
}

export default SidebarPresenter