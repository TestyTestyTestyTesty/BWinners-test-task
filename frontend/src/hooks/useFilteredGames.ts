import { isSameDay } from 'date-fns';
import { useFilterStore } from '@store/useFilterStore';
import type { Game } from '@typeDefs/game';

export const useFilteredGames = (games: Game[]) => {
  const { selectedSport, selectedDate } = useFilterStore();

  return games.filter((game) => {
    const matchesSport = selectedSport ? game.sport === selectedSport : true;
    const matchesDate = selectedDate ? isSameDay(new Date(game.commence_time), selectedDate) : true;
    return matchesSport && matchesDate;
  });
};
