import { create } from 'zustand';

type FilterState = {
  selectedSport: string | null;
  selectedDate: Date | null;
  setSelectedSport: (sport: string) => void;
  setSelectedDate: (date: Date | null) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedSport: null,
  selectedDate: null,
  setSelectedSport: (sport) => set({ selectedSport: sport }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  reset: () => set({ selectedSport: null, selectedDate: null }),
}));
