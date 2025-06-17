import { useEffect, useMemo } from 'react';
import { useFilterStore } from '@store/useFilterStore';
import type { Game } from '@typeDefs/game';

export const useInitializeSport = (games: Game[]) => {
  const { selectedSport, setSelectedSport } = useFilterStore();

  const sportTypes = useMemo(() => {
    return Array.from(new Set(games.map((g) => g.sport)));
  }, [games]);

  useEffect(() => {
    if (!selectedSport && sportTypes.length > 0) {
      setSelectedSport(sportTypes[0]);
    }
  }, [selectedSport, sportTypes, setSelectedSport]);
};
