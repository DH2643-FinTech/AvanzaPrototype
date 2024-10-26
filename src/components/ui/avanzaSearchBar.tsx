
import React from "react";
import { Input } from "../shadcn/input";

const AvanzaSearchBar = (props: any) => {


  //#region DEAD CODE

  // const [search, setSearch] = useState("");
  // const [showResults, setShowResults] = useState(false);
  // const [filteredResults, setFilteredResults] = useState<
  //   { id: string; name: string }[]
  // >([]);

  // const result = useAppSelector((state) => state.company.companiesIds);

  // const companies =
  //   result?.map((company: any) => ({
  //     id: company._id,
  //     name: company.name,
  //   })) || [];

  // useEffect(() => {
  //   if (search?.trim()) {
  //     const results = companies.filter((company: any) =>
  //       company.name.toLowerCase().includes(search?.toLowerCase())
  //     );

  //     setFilteredResults(results);
  //     setShowResults(true);
  //   } else {
  //     setFilteredResults([]);
  //     setShowResults(false);
  //   }
  // }, [search]);

  // const handleSearch = (search: any) => {
  //   props.setSearchParam(search);
  // };

  // const handleKeyDown = (e: any) => {
  //   if (e.key === "Enter") {
  //     setShowResults(false);
  //     handleSearch(search);
  //   }
  // };

  // const handleSelect = (companyName: any) => {
  //   setSearch(companyName);
  //   handleSearch(companyName);
  //   setShowResults(false);
  // };

  // const handleInputChange = (e: any) => {
  //   const query = e.target.value;
  //   setSearch(query);
  // };

  //#endregion

  const {
    search,
    showResults,
    filteredResults,
    handleKeyDown,
    handleSelect,
    handleInputChange,
  } = props;


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
          {filteredResults.map((company: { id: string; name: string }) => {
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