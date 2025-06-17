export const DRAWABLE_SPORTS = ['Soccer', 'Football', 'Hockey'] as const;

export type DrawableSport = (typeof DRAWABLE_SPORTS)[number];

export const isDrawableSport = (sport: string): sport is DrawableSport =>
  DRAWABLE_SPORTS.includes(sport as DrawableSport);
