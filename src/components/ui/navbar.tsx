import { use, useEffect, useState } from "react";
import { Input } from "../shadcn/input";
import ToggleSingInSignUpForm from "./toggleSingInSignUpForm";
import { fetchCompanyIdFromServer } from "@/src/lib/features/company/companyAPI";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import AdvancedSearch from "../advancedSearch";

const companies = [
    { id: 1, name: "Google" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Amazon" },
    { id: 4, name: "Microsoft" },
    { id: 5, name: "Meta" },
  ];

const Navbar = () => {
//   const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const result = useAppSelector((state) => state.company.companiesIds);

const handleSearch = (search: any) => {
  dispatch(fetchCompanyIdFromServer({ name: search }));
  console.log("fetching data from server:" + search);
};

  useEffect(() => {
    console.log(result);
  }, [result]);

  const [search, setSearch] = useState(""); // Stores the search term
  const [filteredResults, setFilteredResults] = useState<{ id: number; name: string }[]>([]); // Stores filtered search results
  const [showResults, setShowResults] = useState(false); // Controls whether results are shown

  useEffect(() => {
    if (search.trim()) {
      const results = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResults(results);
      setShowResults(true); // Show suggestions only if search term is not empty
    } else {
      setFilteredResults([]);
      setShowResults(false); // Hide suggestions if search is empty
    }
  }, [search]); // Runs only when `search` value changes

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setShowResults(false);
      handleSearch(search) // Hide suggestions when Enter is pressed
    }
  };

  const handleSelect = (companyName: any) => {
    setSearch(companyName); // Set the search bar to the selected company
    setShowResults(false); // Hide the results dropdown when a company is selected
  };

  const handleInputChange = (e: any) => {
    const query = e.target.value;
    setSearch(query); // Update the search term
  };

  return (
    <div className="flex justify-between items-center w-9/12 h-[150px] px-4 border-b border-gray-300">
      <div className="flex items-center w-[400px]">
        {/* <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(search);
            }
          }}
          id="search"
          type="text"
          placeholder="Search for a company"
          className="w-full border border-black"
          required
        /> */}
         <div className="flex justify-between items-center w-9/12 h-[150px] px-4 border-b border-gray-300">
      <div className="flex items-center w-[400px]">
        <div className="relative w-full">
          <Input
            value={search}
            onChange={handleInputChange} // Handle input change
            onKeyDown={handleKeyDown} // Handle Enter key press
            id="search"
            type="text"
            placeholder="Search for a company"
            className="w-full border border-black px-3 py-2 rounded-md"
            required
          />
        
          {showResults && filteredResults.length > 0 && (
            <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {filteredResults.map((company) => (
                <li
                  key={company.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(company.name)} // Handle company selection
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
          {showResults && filteredResults.length === 0 && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 px-3 py-2">
              No company found.
            </div>
          )}
        </div>
      </div>
    </div>

        {/* <AdvancedSearch/> */}
      </div>
      <ToggleSingInSignUpForm />
    </div>
  );
};

export default Navbar;
