"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/src/lib/utils/utils";
import { Button } from "@/src/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/shadcn/popover";
import { useState } from "react";

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    // Add more frameworks as needed
  ];
  
  const AdvancedSearch = () => {
    const [searchTerm, setSearchTerm] = useState(""); // Stores the user input
    const [value, setValue] = useState(""); // Stores the selected value
  
    // Filtered frameworks based on the searchTerm
    const filteredFrameworks = frameworks.filter((framework) =>
      framework.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <div className="relative"> {/* Ensure the parent is relative to position the dropdown */}
        <Command>
          {/* Search Input */}
          <CommandInput
            placeholder="Search framework..."
            value={searchTerm}
            onValueChange={setSearchTerm} // Update search term as user types
          />
          {/* Absolutely position the CommandList so it doesn't affect the layout */}
          {searchTerm && (
            <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
              <CommandList>
                {filteredFrameworks.length > 0 ? (
                  <CommandGroup>
                    {filteredFrameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue); // Update the selected value
                          setSearchTerm(""); // Clear the search input after selection
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>No framework found.</CommandEmpty>
                )}
              </CommandList>
            </div>
          )}
        </Command>
      </div>
    );
  };
export default AdvancedSearch;