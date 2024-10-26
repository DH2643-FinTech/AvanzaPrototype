"use client"

import SidebarView from './sidebarView'
import { useSession } from 'next-auth/react'
import { useAppSelector } from "@/lib/model/store"
import { useAppDispatch } from '../../lib/model/store'
import { usePathname, useRouter } from 'next/navigation'
import { selectRecentlyVisited } from "@/lib/model/slices/recently_visited/recentlyVisitedSlice"
import { setSearchParamName } from '../../lib/model/slices/company/companySlice'
import { fetchRecentCompanyReports } from '../../lib/model/slices/financialReport/financialReportsSlice'
import { SidebarProps } from './sidebarTypes'

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
    
    const sidebarProps: SidebarProps = {
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