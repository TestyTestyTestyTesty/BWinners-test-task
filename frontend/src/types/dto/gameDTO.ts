export interface GameDTO {
  id: number;
  sport: string;
  home_team: string;
  away_team: string;
  odds: {
    home_win: number;
    draw?: number | null;
    away_win: number;
  };
  commence_time: string;
}
