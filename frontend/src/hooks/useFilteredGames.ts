import { isSameDay, isAfter } from 'date-fns';
import { useFilterStore } from '@store/useFilterStore';
import type { Game } from '@typeDefs/game';

export const useFilteredGames = (games: Game[]) => {
  const { selectedSport, selectedDate } = useFilterStore();
  const now = new Date();

  return games.filter((game) => {
    const gameDate = new Date(game.commence_time);

    const matchesSport = selectedSport ? game.sport === selectedSport : true;
    const matchesDate = selectedDate ? isSameDay(gameDate, selectedDate) : true;

    const isVisibleByTime = selectedDate ? true : isAfter(gameDate, now);

    return matchesSport && matchesDate && isVisibleByTime;
  });
};
