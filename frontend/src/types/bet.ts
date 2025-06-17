import type { Odds } from './game';
export type BetType = 'home' | 'draw' | 'away';

export interface BettingOption {
  label: string;
  value: number;
  betType: BetType;
}

export interface PlacedBet {
  matchId: number;
  betType: BetType;
  stake: number;
  odds: Odds;
}

export interface PlacedBetsResponse {
  id: string;
  bets: PlacedBet[];
}

export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  betType: BetType;
  stake: number;
  odds: Odds;
}
