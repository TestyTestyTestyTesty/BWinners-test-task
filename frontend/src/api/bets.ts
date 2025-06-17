import { config } from '@config/api';
import { fetchJson } from '@utils/fetchJson';
import type { BetSelection, PlacedBetsResponse } from '@typeDefs/bet';

export const placeBets = async (bets: BetSelection[]): Promise<PlacedBetsResponse> => {
  return fetchJson(`${config.API_BASE_URL}/bets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bets }),
  });
};
