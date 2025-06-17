import { config } from '@config/api';
import { fetchJson } from '@utils/fetchJson';
import { mapGameDtoToGame } from '@mappers/gameMapper';
import type { Game } from '@typeDefs/game';
import type { GameDTO } from '@typeDefs/dto/gameDTO';

export const fetchGames = async (): Promise<Game[]> => {
  const data: GameDTO[] = await fetchJson(`${config.API_BASE_URL}/games`);
  return data.map(mapGameDtoToGame);
};
