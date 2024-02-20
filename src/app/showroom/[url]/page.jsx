'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addCarToDb } from "@/lib/mongodb/actions";

const transmissions = [
    {
      value: "Manual",
      label: "Manual",
    },
    {
      value: "Automatic",
      label: "Automatic",
    },
  ]

  const fuels = [
    {
      value: "Petrol",
      label: "Petrol",
    },
    {
      value: "Diesel",
      label: "Diesel",
    },
    {
       value: "Hybrid",
       label: "Hybrid",
    },
    {
        value: "Electric",
        label: "Electric",
      },
  ]

const Page = () =>{
    const [error, setError] = useState('');
    //Data States
    const [carName, setCarName] = useState('');
    const [registrationYear, setRegistrationYear] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [kilometersDriven, setKilometersDriven] = useState();
    const [numberOfOwners, setNumberOfOwners] = useState();

    // Car URL
    const [imageUrl, setImageUrl] = useState(null);

    // Transmission
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    // Fuel
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState("");

    // Function to handle file upload
    const handleImageUpload = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };

    // console.log(imageUrl);

    //Send Data to MongoDB addCarToDb
    const sendData = () =>{
      if(imageUrl === null){
        setError('All fields are required');
        return;
      }
      const createNewCar = {
        Car_Name: carName,
        Year: registrationYear,
        Selling_Price: sellingPrice,
        Present_Price: null,
        Kms_Driven: kilometersDriven,
        Fuel_Type: value1,
        Seller_Type: window.location.pathname.split('/').pop(),
        Transmission: value,
        Owner: numberOfOwners,
        Image_URL: imageUrl,
      }
      console.log(createNewCar);
      addCarToDb(createNewCar);
    }

    return(
        // <div className="mx-auto w-[80%] h-[40rem] my-14 flex-col sm:flex sm:justify-evenly">
        <div className="mx-auto w-[80%] max-h-[20rem] sm:flex sm:justify-evenly">
        
            {/* Image add */}
            {/* <section className="w-[40%] h-[30rem] p-2 border-2 border-blue flex justify-center items-center"> */}
                <section className="w-[40%] h-[30rem] p-2 flex justify-center items-center hover:border-2">
                {imageUrl ? (
                    <img src={imageUrl} onClick={() => setImageUrl(null)} alt="Uploaded" className="hover:cursor-pointer" />
                ) : (
                    <label htmlFor="uploadInput" className="cursor-pointer text-4xl font-bold">
                    +
                        <input
                            type="file"
                            id="uploadInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                        </label>
                    )}   
                </section>

            {/* Card Data */}
            <Card className="w-[20%] border-0 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>Sell Now your Car!</CardTitle>
                    <CardDescription>Complete a short description before pot it on platform</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col space-y-2">
                <p className="text-sm">Car Name:</p>
                <Input
                  type="text"
                  placeholder="Car name"
                  className="rounded-md h-8 w-[200px]"
                  value={carName}
                  onChange={(event) => {
                    setCarName(event.target.value);
                  }}
                />

                <p className="text-sm">Inregistration Year:</p>
                <Input
                  type="number"
                  placeholder="Inregistration Year"
                  className="rounded-md h-8 w-[200px]"
                  value={registrationYear}
                  onChange={(event) => {
                    setRegistrationYear(event.target.value);
                  } }
                />

                <p className="text-sm">Selling Price:</p>
                <Input
                  type="number"
                  placeholder="Selling Price"
                  className="rounded-md h-8 w-[200px]"
                  value={sellingPrice}
                  onChange={(event) => {
                    setSellingPrice(event.target.value);
                  }}
                />

                <p className="text-sm">Kilometers Driven:</p>
                <Input
                  type="number"
                  placeholder="Kilometers Driven"
                  className="rounded-md h-8 w-[200px]"
                  value={kilometersDriven}
                  onChange={(event) => {
                    setKilometersDriven(event.target.value);
                  }}
                />

                <p className="text-sm">Number of Owners:</p>
                <Input
                  type="number"
                  placeholder="Number of Owners"
                  className="rounded-md h-8 w-[200px]"
                  value={numberOfOwners}
                  onChange={(event) => {
                    setNumberOfOwners(event.target.value);
                  }}
                />

                    {/* Combobox Transmissions*/}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between h-8"
                            >
                            {value
                                ? transmissions.find((transmission) => transmission.value === value)?.label
                                : "Select transmission..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 bg-black text-white">
                            <Command>
                            <CommandEmpty>No found.</CommandEmpty>
                            <CommandGroup>
                                {transmissions.map((transmission) => (
                                <CommandItem
                                    key={transmission.value}
                                    value={transmission.value}
                                    onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                    }}
                                >
                                    {transmission.label}
                                    <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === transmission.value ? "opacity-100" : "opacity-0"
                                    )}
                                    />
                                </CommandItem>
                                ))}
                            </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/* Fuels Combobox */}
                    <Popover open={open1} onOpenChange={setOpen1}>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open1}
                            className="w-[200px] justify-between h-8"
                        >
                            {value1
                            ? fuels.find((fuel) => fuel.value === value1)?.label
                            : "Select fuel..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 bg-black text-white">
                        <Command>
                            <CommandGroup>
                            {fuels.map((fuel) => (
                                <CommandItem
                                key={fuel.value}
                                value={fuel.value}
                                onSelect={(currentValue) => {
                                    setValue1(currentValue === value1 ? "" : currentValue);
                                    setOpen1(false);
                                }}
                                >
                                {fuel.label}
                                <CheckIcon
                                    className={cn(
                                    "ml-auto h-4 w-4",
                                    value1 === fuel.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </Command>
                        </PopoverContent>
                    </Popover>
                
                <p className="text-xs opacity-75">Click on uploaded photo to remove it</p>
                {error && (
                  <p className="text-red-600 text-2xl font-semibold">You must upload a photo!</p>
                )}
                <Button className="text-lg rounded-xl w-[200px] bg-black text-white hover:bg-black"
                  onClick={sendData}
                >
                  Post Now</Button>
                </CardContent>
                
            </Card>

        </div>
    )
}

export default Page;