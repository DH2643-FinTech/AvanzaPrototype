"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "./shadcn/input"
import { Button } from "./shadcn/button"
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch"
import { useAppSelector } from "@/src/lib/hooks/useAppSelector"
import { fetchCompanyIdFromServer } from "@/src/lib/features/company/companyAPI"
import { CompanyID } from "@/src/app/api/companies/dataTypes"
import Link from "next/link"

const Searchbar = () => {
    const [query, setQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useAppDispatch()
    const { companiesIds, loading, error } = useAppSelector((state) => state.company)

    useEffect(() => {
        if (query.length > 0) {
            dispatch(fetchCompanyIdFromServer({ name: query }))
        }
    }, [query, dispatch])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setShowDropdown(e.target.value.length > 0)
    }

    const handleSearch = () => {
        if (query.length > 0) {
            dispatch(fetchCompanyIdFromServer({ name: query }))
        }
    }

    return (
        <div className="w-full relative">
            <div className="flex w-full items-center">
                <Input
                    type="text"
                    placeholder="Search for a company..."
                    value={query}
                    onChange={handleInputChange}
                    className="w-full pr-10"
                />
                <Button
                    type="submit"
                    onClick={handleSearch}
                    className="absolute right-0 px-3 h-full"
                    variant="ghost"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>
            {showDropdown && companiesIds.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {companiesIds.map((company: CompanyID) => (
                        <Link
                            key={company._id}
                            href={`/stock/${company._id}`}
                            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setShowDropdown(false)}
                        >
                            <div className="font-medium">{company.name}</div>
                        </Link>
                    ))}
                </div>
            )}
            {loading && <div className="mt-2">Loading...</div>}
            {error && <div className="mt-2 text-red-500">{error}</div>}
        </div>
    )
}

export default Searchbar