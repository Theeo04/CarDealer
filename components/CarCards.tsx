import { Button } from '@/components/ui/button';
import React from 'react';
import { PiSteeringWheel } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";
import { BsFuelPumpFill } from "react-icons/bs";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface CarCardProps {
  // key: number;
  name: string;
  transmission: string,
  sellingPrice: number,
  fuel:string,
  imageUrl:string,
  year:number, 
  kmDriven: number
}

export const CarCard: React.FC<CarCardProps> = ({ name, transmission, sellingPrice, fuel, imageUrl, year, kmDriven}) => {
  function truncateWord(word:string) {
    if (word.length > 5) {
      return word.substring(0, 5) + '...';
    }
    return word;
  }
// hover:opacity-90
  return (
    <div className='p-2 border-2 border-gray-400 w-[100%] sm:w-[20rem] xl:w-[25rem] rounded-xl relative group'>
      <img src={imageUrl} className='w-full'/>
      
      <section className='flex justify-between absolute inset-x-0 bottom-0 px-4 pb-2 font-semibold text-xs xl:text-lg opacity-100 transition-opacity duration-300 group-hover:opacity-0'>
        <div className='flex space-x-1'>
          <h1>{truncateWord(name.toUpperCase())}</h1>
          <IoCarSportSharp className='text-sm xl:text-2xl'/>
        </div>
        <div className='flex space-x-1'>
          <p>{transmission}</p>
          <PiSteeringWheel className='text-sm xl:text-2xl'/> 
        </div>
        <div className='flex space-x-1'>
          <h1>{fuel}</h1>
          <BsFuelPumpFill className='text-sm pt-1 xl:text-2xl'/>
        </div>
        <div className='flex space-x-1'>
          <h1>{sellingPrice * 1000}</h1>
          <PiCurrencyDollarSimpleFill className='text-sm xl:text-2xl'/>
        </div>
      </section>
        <Drawer>
        <DrawerTrigger className="absolute inset-x-0 bottom-0 px-4 pb-2 flex items-center justify-center text-black font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          More Details
        </DrawerTrigger>
        
        <DrawerContent className='bg-black h-[55%] text-white border-black'>
          <DrawerHeader>
            <DrawerTitle>More details about our {name.toUpperCase()}</DrawerTitle>
            <DrawerDescription>More details can be found by contacting us!</DrawerDescription>
          </DrawerHeader>
          <div className='flex sm:justify-evenly'>
            <img src={imageUrl} className='w-[18rem] hidden text-xs md:text-2xl sm:block'/>
            <section className='flex flex-col text-xl space-y-2'>
              <p>Car name: {name.toUpperCase()}</p>
              <p>Transmission: {transmission}</p>
              <p>Selling Price: {sellingPrice}</p>
              <p>Fuel: {fuel}</p>
              <p>First registration year: {year}</p>
              <p>Kilometers driven: {kmDriven}</p>
            </section>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button ><IoIosClose className='text-3xl'/></Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>

      </Drawer>

</div>


  );
};
