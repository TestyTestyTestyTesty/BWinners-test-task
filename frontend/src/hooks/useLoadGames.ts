import { useEffect, useState } from 'react';
import { fetchGames } from '@api/games';
import type { Game } from '@typeDefs/game';
import { messages } from '@messages/messages';

export const useLoadGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError(messages.errors.failed_to_load_games);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return { games, loading, error };
};
