
import React from "react";
import { Input } from "../shadcn/input";

const AvanzaSearchBar = (props: any) => {

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
