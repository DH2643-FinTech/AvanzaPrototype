'use client';
import React from 'react'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/src/lib/hooks/useAppDispatch'

import { fetchCompanyDetails, fetchCompanyIdFromServer } from '../../lib/features/company/companyAPI'

const ApiTest = () => {

  const dispatch = useAppDispatch();

  const fetchCompanyDetailsHandler = (symbol: string) => {
    // dispatch(fetchCompanyDetails("symbol"))
    dispatch(fetchCompanyIdFromServer({name: undefined, randomCount: undefined}))
  }

  return (
    <div>
        <button className='borde w-10 h-10 bg-slate-800' onClick={()=> fetchCompanyDetailsHandler("AAPL")
        }>Call API Test</button>
    </div>
  )
}

export default ApiTest