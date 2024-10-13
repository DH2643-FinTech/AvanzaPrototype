import { useState } from "react";
import { Input } from "../shadcn/input";
import ToggleSingInSignUpForm from "./toggleSingInSignUpForm";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (search: any) => {
    console.log("fetching data from server:" + search);
  };

  return (
    <div className="flex justify-between items-center w-9/12 h-[150px] px-4 border-b border-gray-300">
      <div className="flex items-center w-[400px]">
        <Input
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
        />
      </div>
      <ToggleSingInSignUpForm />
    </div>
  );
};

export default Navbar;
