import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { fetchWatchlist, removeFromWatchlist, selectWatchlistStocks } from "@/src/lib/features/watchlist/watchlistSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/shadcn/table";
import { Button } from "@/src/components/shadcn/button";
import { Input } from "@/src/components/shadcn/input";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/shadcn/tooltip";

type SortField = 'id' | 'name' | 'revenue' | 'profit';
type SortOrder = 'asc' | 'desc';

export default function WatchlistTable() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const watchlistStocks = useAppSelector(selectWatchlistStocks);
    const companies = useAppSelector((state) => state.company.companies);
    const currentStock = useAppSelector((state) => state.company.currentStock);

    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        dispatch(fetchWatchlist());
    }, [dispatch]);

    const watchlistCompanies = useMemo(() => {
        return companies.filter(company => watchlistStocks.includes(company.id));
    }, [companies, watchlistStocks]);

    const toggleRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleRemoveFromWatchlist = (stockId: string) => {
        dispatch(removeFromWatchlist(stockId));
    };

    const filteredAndSortedCompanies = useMemo(() => {
        return watchlistCompanies
            .filter(company =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.id.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    }, [watchlistCompanies, searchTerm, sortField, sortOrder]);

    const paginatedCompanies = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredAndSortedCompanies.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredAndSortedCompanies, currentPage]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSortedCompanies.length / rowsPerPage));

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const SortIcon = ({ field }: { field: SortField }) => (
        <span className="ml-2">
            {sortField === field ? (
                sortOrder === 'asc' ? '▲' : '▼'
            ) : (
                <span className="text-gray-300">▼</span>
            )}
        </span>
    );

    return (
        <div className="space-y-4">
            <Input
                type="text"
                placeholder="Filter companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="w-[100px] cursor-pointer"
                                onClick={() => toggleSort('id')}
                            >
                                ID <SortIcon field="id" />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('name')}
                            >
                                Company <SortIcon field="name" />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('revenue')}
                            >
                                Revenue <SortIcon field="revenue" />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => toggleSort('profit')}
                            >
                                Profit <SortIcon field="profit" />
                            </TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCompanies.map((company) => (
                            <React.Fragment key={company.id}>
                                <TableRow
                                    className="cursor-pointer"
                                    onClick={() => toggleRow(company.id)}
                                >
                                    <TableCell className="font-medium">{company.id}</TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>${company.revenue.toLocaleString()}</TableCell>
                                    <TableCell>${company.profit.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-between items-center">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-0 hover:bg-gray-100 rounded-full w-8 h-8"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemoveFromWatchlist(company.id);
                                                            }}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Remove from watchlist</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-0 hover:bg-gray-100 rounded-full w-8 h-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleRow(company.id);
                                                }}
                                            >
                                                {expandedRow === company.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <AnimatePresence>
                                    {expandedRow === company.id && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="p-0">
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="p-4 bg-white">
                                                        <div className="mb-4">
                                                            <h4 className="font-semibold mb-2">Description</h4>
                                                            <p className="text-sm">{company.description}</p>
                                                        </div>
                                                        {currentStock && currentStock.id === company.id && (
                                                            <div className="mb-4">
                                                                <h4 className="font-semibold mb-2">Latest Stock Info</h4>
                                                                <p>Open: ${currentStock.ohlc[currentStock.ohlc.length - 1].open}</p>
                                                                <p>Close: ${currentStock.ohlc[currentStock.ohlc.length - 1].close}</p>
                                                                <p>High: ${currentStock.ohlc[currentStock.ohlc.length - 1].high}</p>
                                                                <p>Low: ${currentStock.ohlc[currentStock.ohlc.length - 1].low}</p>
                                                            </div>
                                                        )}
                                                        <div className="mt-4">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => router.push(`/stock/${company.id}`)}
                                                            >
                                                                View Detailed Page
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                        {paginatedCompanies.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    {filteredAndSortedCompanies.length > 0 ? (
                        `Showing ${filteredAndSortedCompanies.length} of ${watchlistCompanies.length} results`
                    ) : (
                        "No results found"
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>{currentPage} of {totalPages}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}