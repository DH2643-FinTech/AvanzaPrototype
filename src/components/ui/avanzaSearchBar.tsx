
import React, { useEffect, useState } from "react";
import { Input } from "../shadcn/input";
import { useAppSelector, useAppDispatch } from "@/lib/model/store";
import { fetchAllCompanyIds } from "@/lib/model/slices/company/companyAPI";
import { fetchCompanyDetails } from "@/lib/model/slices/company/companyAPI";
import { setCompanies } from "@/lib/model/slices/company/companySlice";

const AvanzaSearchBar = (props: any) => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<
    { id: string; name: string }[]
  >([]);

  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.company.companiesIds);

  const companies =
    result?.map((company: any) => ({
      id: company._id,
      name: company.name,
    })) || [];

  useEffect(() => {
    if (search?.trim()) {
      const results = companies.filter((company: any) =>
        company.name.toLowerCase().includes(search?.toLowerCase())
      );

      setFilteredResults(results);
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
    }
  }, [search]);

  const handleSearch = (search: any) => {
    // const id = companies.find((company) => company.name === search)?.id;
    // dispatch(
    //   fetchCompanyDetails({
    //     name: search,
    //     id: id,
    //     defaultTimePeriod: true,
    //     fromDateValid: false
    //   })
    // );
    props.setSearchParam(search);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setShowResults(false);
      handleSearch(search);
    }
  };

  const handleSelect = (companyName: any) => {
    setSearch(companyName);
    handleSearch(companyName);
    setShowResults(false);
  };

  const handleInputChange = (e: any) => {
    const query = e.target.value;
    setSearch(query);
  };

  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        id="search"
        type="text"
        placeholder="Search for a company"
        className="w-full border border-black px-3 py-2 rounded-md"
        required
      />
      {showResults && filteredResults.length > 0 && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredResults.map((company) => {
            return (
              <li
                key={company.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(company.name)}
              >
                {company.name}
              </li>
            );
          })}
        </ul>
      )}
      {showResults && filteredResults.length === 0 && (
        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 px-3 py-2">
          No company found.
        </div>
      )}
    </div>
  );
};

export default AvanzaSearchBar;
