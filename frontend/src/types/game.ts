export type Odds = {
  home: number;
  draw: number | null;
  away: number;
};

export type SportType = 'Soccer' | 'Basketball' | 'Tennis';

export interface Game {
  id: number;
  sport: SportType;
  home_team: string;
  away_team: string;
  odds: Odds;
  commence_time: Date;
}
