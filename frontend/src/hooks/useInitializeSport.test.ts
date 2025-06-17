// useInitializeSport.test.ts
import { renderHook } from '@testing-library/react';
import { useInitializeSport } from './useInitializeSport';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as FilterStore from '@store/useFilterStore';
import type { Game } from '@typeDefs/game';

const mockSetSelectedSport = vi.fn();

vi.mock('@store/useFilterStore', () => ({
  useFilterStore: vi.fn(),
}));

describe('useInitializeSport', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('sets the first available sport if none is selected', () => {
    // @ts-expect-error override mocked implementation
    FilterStore.useFilterStore.mockReturnValue({
      selectedSport: null,
      setSelectedSport: mockSetSelectedSport,
    });

    const games: Game[] = [
      {
        id: 1,
        sport: 'Soccer',
        home_team: 'Team A',
        away_team: 'Team B',
        commence_time: new Date(),
        odds: { home: 1.5, draw: 3.0, away: 2.8 },
      },
      {
        id: 2,
        sport: 'Basketball',
        home_team: 'Team C',
        away_team: 'Team D',
        commence_time: new Date(),
        odds: { home: 1.8, draw: null, away: 2.0 },
      },
    ];

    renderHook(() => useInitializeSport(games));

    expect(mockSetSelectedSport).toHaveBeenCalledWith('Soccer');
  });

  it('does not set sport if one is already selected', () => {
    // @ts-expect-error override mocked implementation
    FilterStore.useFilterStore.mockReturnValue({
      selectedSport: 'Basketball',
      setSelectedSport: mockSetSelectedSport,
    });

    const games: Game[] = [
      {
        id: 1,
        sport: 'Soccer',
        home_team: 'Team A',
        away_team: 'Team B',
        commence_time: new Date(),
        odds: {
          home: 1.5,
          draw: 3.2,
          away: 2.8,
        },
      },
    ];

    renderHook(() => useInitializeSport(games));

    expect(mockSetSelectedSport).not.toHaveBeenCalled();
  });

  it('does nothing if games is empty', () => {
    // @ts-expect-error override mocked implementation
    FilterStore.useFilterStore.mockReturnValue({
      selectedSport: null,
      setSelectedSport: mockSetSelectedSport,
    });

    renderHook(() => useInitializeSport([]));

    expect(mockSetSelectedSport).not.toHaveBeenCalled();
  });
});
