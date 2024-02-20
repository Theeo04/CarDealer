"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { readData } from "@/lib/mongodb/actions";
import { Input } from "@/components/ui/input";
import useFiltersStore from "@/lib/zustand/filtersStore";

interface Car {
  Car_Name: string;
  Year: number;
  Selling_Price: number;
  Present_Price: number;
  Kms_Driven: number;
  Fuel_Type: string;
  Seller_Type: string;
  Transmission: string;
  Owner: number;
  Image_URL: string;
}

interface Filters {
  brand: string | null;
  transmission: string | null;
  fuel: string | null;
  minKm: { $gte: number; } | null;
  maxKm: { $lte: number; } | null;
  minPrice: { $gte: number; } | null;
  maxPrice: { $lte: number; } | null;
}


const transmission = [
  {
    value2: "Manual",
    label: "Manual",
  },
  {
    value2: "Automatic",
    label: "Automatic",
  }
]

const fuels = [
  {
    value3: "Petrol",
    label: "Petrol",
  },
  {
    value3: "Diesel",
    label: "Diesel",
  },
  {
    value3: "Electric",
    label: "Electric",
  },
  {
    value3: "Hybrid",
    label: "Hybrid",
  }
]

export function Filters() {
  const [carData, setCarData] = React.useState<Car[]>([]); // Define carData in component state

  React.useEffect(() => {
    async function fetchData() {
      try {
        const carData: Car[] = await readData();
        // console.log(carData);
        setCarData(carData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // For Brand set filter
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // Transmisson filter
  const [open2, setOpen2] = React.useState(false)
  const [value2, setValue2] = React.useState("")
  // For fuel filter
  const [open3, setOpen3] = React.useState(false)
  const [value3, setValue3] = React.useState("")
  // For km range filter
  const [minKm, setMinKm] = React.useState(0);
  const [maxKm, setMaxKm] = React.useState(99999999);
 
  // For price range
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(99999999);
  
  // Filter object
  const [filters, setFilters] = React.useState<Filters>({
    brand: null,
    transmission: null,
    fuel: null,
    minKm: null,
    maxKm: null,
    minPrice: null,
    maxPrice: null
  });

  // Filter out duplicate brands
  const uniqueCarBrands = Array.from(new Set(carData.map(car => car.Car_Name)));

  // Send filters data
  const setFiltersFromStore = useFiltersStore((state) => state.setFilters);

  const sendFiltersToShowroom = React.useCallback(() => {
    setFiltersFromStore({
      brand: value || null,
      transmission: value2 || null,
      fuel: value3 || null,
      minKm: minKm ? { $gte: minKm } : null,
      maxKm: maxKm ? { $lte: maxKm } : null,
      minPrice: minPrice ? { $gte: minPrice } : null,
      maxPrice: maxPrice ? { $lte: maxPrice } : null
    });
  }, [value, value2, value3, minKm, maxKm, minPrice, maxPrice, setFiltersFromStore]);

  React.useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <Accordion type="single" collapsible className="w-[80%] sm:w-[30%]">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm sm:text-xl font-semibold">Filters</AccordionTrigger>
        {/* Brand Filter */}
        <AccordionContent>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[80%] sm:[200px] justify-between"
              >
                {value ? value : "Select brand..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0 bg-black text-white">
              <Command>
                <CommandInput placeholder="Search brand..." className="h-9 " />
                <CommandEmpty >No brand found.</CommandEmpty>
                <CommandGroup >
                  {uniqueCarBrands.map((brand, index) => (
                    <CommandItem
                      key={index}
                      value={brand}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {brand}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === brand ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </AccordionContent>

        {/* Transmission Filter */}
        <AccordionContent className="my-3">
          <Popover open={open2} onOpenChange={setOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-[80%] sm:[200px] justify-between text-xs"
              >
                {value2 ? value2 : "Select transmission..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden sm:block" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[80%] sm:[200px] p-0 bg-black text-white">
              <Command>
                <CommandInput placeholder="Search transmission..." className="h-9" />
                <CommandEmpty>No transmission found.</CommandEmpty>
                <CommandGroup>
                  {transmission.map((trans) => (
                    <CommandItem
                      key={trans.value2}
                      value={trans.value2}
                      onSelect={(currentValue2) => {
                        setValue2(currentValue2 === value2 ? "" : currentValue2);
                        setOpen2(false);
                      }}
                    >
                      {trans.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value2 === trans.value2 ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </AccordionContent>


        {/* Fuel Filter */}
        <AccordionContent className="my-3">
          <Popover open={open3} onOpenChange={setOpen3}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open3}
                className="w-[80%] sm:[200px] justify-between"
              >
                {value3 ? value3 : "Select fuels..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-black text-white">
              <Command>
                <CommandInput placeholder="Search fuels..." className="h-9" />
                <CommandEmpty>No fuels found.</CommandEmpty>
                <CommandGroup>
                  {fuels.map((fuel) => (
                    <CommandItem
                      key={fuel.value3}
                      value={fuel.value3}
                      onSelect={(currentvalue3) => {
                        setValue3(currentvalue3 === value3 ? "" : currentvalue3);
                        setOpen3(false);
                      }}
                    >
                      {fuel.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value3 === fuel.value3 ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </AccordionContent>


        <AccordionContent>
        <Button 
          className="border-2 border-black rounded-2xl hover:text-white hover:bg-black"
          onClick={sendFiltersToShowroom}
        >
          Submit Filters
        </Button>
        </AccordionContent>

      </AccordionItem>
    </Accordion>
  );
}

