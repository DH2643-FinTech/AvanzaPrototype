import React, { useEffect, useState } from "react";
import { Input } from "../shadcn/input";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { fetchCompanyIdFromServer } from "@/src/lib/features/company/companyAPI";
import { fetchCompanyDetails } from "@/src/lib/features/company/companyAPI";

const avanzaSearchBar = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<
    { id: number; name: string }[]
  >([]);

  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.company.companiesIds);

  const companies =
    result?.map((company) => ({
      id: Number(company._id),
      name: company.name,
    })) || [];

  useEffect(() => {
    console.log("fetching data from server !");
    dispatch(fetchCompanyIdFromServer({ name: "AAK" }));
  }, []);

  useEffect(() => {
    if (search?.trim()) {
      const results = companies.filter((company) =>
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
    const id = companies.find((company) => company.name === search)?.id;
    dispatch(
      fetchCompanyDetails({
        name: search,
        randomCount: 5,
        timePeriod: "one_month",
        id: id?.toString(),
      })
    );
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setShowResults(false);
      handleSearch(search);
    }
  };

  const handleSelect = (companyName: any) => {
    setSearch(companyName);
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

export default avanzaSearchBar;