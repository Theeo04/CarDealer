import {create} from 'zustand';

interface Filters {
  brand: string | null;
  transmission: string | null;
  fuel: string | null;
  minKm: { $gte: number } | null;
  maxKm: { $lte: number } | null;
  minPrice: { $gte: number } | null;
  maxPrice: { $lte: number } | null;
}


interface FiltersStore {
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}

const useFiltersStore = create<FiltersStore>((set) => ({
  filters: {
    brand: null,
    transmission: null,
    fuel: null,
    minKm: null,
    maxKm: null,
    minPrice: null,
    maxPrice: null,
  },
  setFilters: (newFilters) => set({ filters: newFilters }),
}));

export default useFiltersStore;