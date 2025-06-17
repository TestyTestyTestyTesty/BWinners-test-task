import type { GameDTO } from '@typeDefs/dto/gameDTO';
import type { Game } from '@typeDefs/game';

export const mapGameDtoToGame = (dto: GameDTO): Game => ({
  id: dto.id,
  sport: dto.sport as Game['sport'],
  home_team: dto.home_team,
  away_team: dto.away_team,
  odds: {
    home: dto.odds.home_win,
    draw: dto.odds.draw ?? null,
    away: dto.odds.away_win,
  },
  commence_time: new Date(dto.commence_time),
});
