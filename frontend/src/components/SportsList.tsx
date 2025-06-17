import { type FC, useMemo } from 'react';
import { useFilterStore } from '@store/useFilterStore';
import { useLoadGames } from '@hooks/useLoadGames';
import { messages } from '@messages/messages';
import type { SportType } from '@typeDefs/game';

interface SportsListProps {
  listName: string;
}

export const SportsList: FC<SportsListProps> = ({ listName }) => {
  const { selectedSport, setSelectedSport } = useFilterStore();
  const { games, loading, error } = useLoadGames();

  const sportTypes: SportType[] = useMemo(
    () => Array.from(new Set(games.map((game) => game.sport))),
    [games]
  );

  if (loading) return <div className="text-sm text-gray-500">{messages.common.loading_sports}</div>;
  if (error)
    return <div className="text-sm text-red-500">{messages.errors.failed_to_load_sports}</div>;

  return (
    <aside className="lg:max-w-[200px] w-full">
      <div className="p-4 bg-white border-r border-gray-200 shadow-sm rounded-lg">
        <h2 className="text-center text-md font-semibold text-gray-800 mb-2">{listName}</h2>
        <ul className="flex lg:flex-col flex-row space-y-1 max-h-[400px] overflow-auto pr-1">
          {sportTypes.map((sport) => (
            <li key={sport}>
              <button
                onClick={() => setSelectedSport(sport)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
                ${
                  selectedSport === sport
                    ? 'bg-red-100 text-red-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {sport}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
