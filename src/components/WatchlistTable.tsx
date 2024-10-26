import React, {  useMemo, useEffect } from "react";

// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/model/store";
// import {
//   fetchWatchlist,
//   removeFromWatchlist,
// } from "@/lib/model/slices/watchlistSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

type SortField =
  | "_id"
  | "name"
  | "lastPrice"
  | "change"
  | "changePercent"
  | "totalNumberOfShares";
type SortOrder = "asc" | "desc";

export default function WatchlistTable(props: any) {

  //#region DEAD CODE

  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // const companies = useAppSelector((state) => state.company.companies);


  // const watchlistDetails = useAppSelector(
  //   (state) => state.watchlist.watchlistDetails
  // );
  // const currentStock = useAppSelector((state) => state.company.currentStock);


  // const [expandedRow, setExpandedRow] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [sortField, setSortField] = useState<SortField>("_id");
  // const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  // const [currentPage, setCurrentPage] = useState(1);
  // const rowsPerPage = 10;

  // useEffect(() => {
  //   dispatch(fetchWatchlist());
  // }, [dispatch]);

  // const handleRemoveFromWatchlist = (stockId: string) => {
  //   dispatch(removeFromWatchlist(stockId));
  // };



  // const toggleRow = (id: string) => {
  //   setExpandedRow(expandedRow === id ? null : id);
  // };



  // const toggleSort = (field: SortField) => {
  //   if (field === sortField) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  // };

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchTerm]);

//# endregion

  const {
    watchlistDetails,
    currentStock,
    companies,
    expandedRow,
    toggleRow,
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    toggleSort,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    handleRemoveFromWatchlist,
    router,
  } = props;

  const watchlistCompanies = useMemo(() => {
    return watchlistDetails || companies;
    //return companies.filter(company => watchlistStocks.includes(company._id));
  }, [companies, watchlistDetails]);

  const filteredAndSortedCompanies = useMemo(() => {
    return watchlistCompanies
      .filter(
        (company: any) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company._id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: any, b: any) => {
        if (a[sortField] !== undefined && b[sortField] !== undefined) {
          if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
  }, [watchlistCompanies, searchTerm, sortField, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedCompanies.length / rowsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);


  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedCompanies
      .slice(startIndex, startIndex + rowsPerPage)
      .map(
        (company: any) =>
          watchlistDetails?.find((c:any) => c._id === company._id) || company
      );
  }, [filteredAndSortedCompanies, currentPage]);




  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-2">
      {sortField === field ? (
        sortOrder === "asc" ? (
          "▲"
        ) : (
          "▼"
        )
      ) : (
        <span className="text-gray-300">▼</span>
      )}
    </span>
  );

  return (
    <div className="space-y-4 w-full">
      <Input
        type="text"
        placeholder="Filter companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      {/* Expands full width */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer"
                onClick={() => toggleSort("_id")}
              >
                ID <SortIcon field="_id" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => toggleSort("name")}
              >
                Company <SortIcon field="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => toggleSort("lastPrice")}
              >
                Last Price <SortIcon field="lastPrice" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => toggleSort("change")}
              >
                Change <SortIcon field="change" />
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.map((company:any) => (
              <React.Fragment key={company._id}>
                <TableRow
                  className="cursor-pointer"
                  onClick={() => toggleRow(company._id)}
                >
                  <TableCell className="font-medium">{company._id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>${company.lastPrice?.toLocaleString()}</TableCell>
                  <TableCell>${company.change?.toLocaleString()}</TableCell>
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
                                handleRemoveFromWatchlist(company._id);
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
                          toggleRow(company._id);
                        }}
                      >
                        {expandedRow === company._id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <AnimatePresence>
                  {expandedRow === company._id && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-4 bg-white">
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">
                                Description
                              </h4>
                              <p className="text-sm">{company.description}</p>
                            </div>
                            {currentStock &&
                              currentStock.id === company._id && (
                                <div className="mb-4">
                                  <h4 className="font-semibold mb-2">
                                    Latest Stock Info
                                  </h4>
                                  <p>
                                    Open: $
                                    {
                                      currentStock.ohlc[
                                        currentStock.ohlc.length - 1
                                      ].open
                                    }
                                  </p>
                                  <p>
                                    Close: $
                                    {
                                      currentStock.ohlc[
                                        currentStock.ohlc.length - 1
                                      ].close
                                    }
                                  </p>
                                  <p>
                                    High: $
                                    {
                                      currentStock.ohlc[
                                        currentStock.ohlc.length - 1
                                      ].high
                                    }
                                  </p>
                                  <p>
                                    Low: $
                                    {
                                      currentStock.ohlc[
                                        currentStock.ohlc.length - 1
                                      ].low
                                    }
                                  </p>
                                </div>
                              )}
                            <div className="mt-4">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  router.push(`/company/stock/${company._id}`)
                                }
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
          {filteredAndSortedCompanies.length > 0
            ? `Showing ${filteredAndSortedCompanies.length} of ${watchlistCompanies.length} results`
            : "No results found"}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev: number) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev: number) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
