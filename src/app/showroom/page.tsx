'use client'
import { useEffect, useState } from 'react';
import { Filters } from '../../../components/Filter';
// import { AccIcon } from '../../../components/AccIcon';
import { CarCard } from '../../../components/CarCards';
import useFiltersStore from '@/lib/zustand/filtersStore';
import { filterCars } from '@/lib/mongodb/actions';
import { FaPlus } from "react-icons/fa";
import { AccIcon } from '../../../components/AccIcon';

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

function Page() {
  const [carData, setCarData] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Obtain the filter from Zustand store
  const filters = useFiltersStore((state) => state.filters);

  useEffect(() => {
    async function fetchData() {
      try {
        // Call filterCars with the filters obtained from Zustand
        const { cars, totalPages } = await filterCars(filters, currentPage);
        setCarData(cars);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [filters, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div>
      <section className="flex space-x-10 sm:justify-between p-2 sm:m-12 ">
        <Filters />
        <section className='flex space-x-2'>
          <AccIcon/>
          <FaPlus className='sm:hidden text-4xl pt-5'/>
        </section>
      </section>

      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {carData.map((car, index) => (
            <CarCard
              key={index}
              name={car.Car_Name}
              transmission={car.Transmission}
              sellingPrice={car.Selling_Price}
              fuel={car.Fuel_Type}
              imageUrl={car.Image_URL}
              year={car.Year}
              kmDriven={car.Kms_Driven}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-white font-semibold text-black border-2 border-black rounded"
        >
          Prev
        </button>
                {/* Render page buttons */}
        {totalPages > 0 && Array.from({ length: Math.min(totalPages, totalPages) }, (_, index) => {
          const pageNumber = currentPage - 1 + index;
          return (
            pageNumber > 0 && pageNumber <= totalPages && (
              <button
                key={index}
                onClick={() => setCurrentPage(pageNumber)}
                className={`mr-2 px-4 py-2 ${currentPage === pageNumber ? 'bg-black text-white' : 'bg-white text-gray-600 border-2 border-gray-600'} rounded`}
              >
                {pageNumber}
              </button>
            )
          );
        })}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="mr-2 px-4 py-2 bg-white font-semibold text-black border-2 border-black rounded"
        >
          Next
        </button>
      </div>


    </div>
  );
}

export default Page;
