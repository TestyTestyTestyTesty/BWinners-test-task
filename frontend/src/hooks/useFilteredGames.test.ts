import { renderHook } from '@testing-library/react';
import { useFilteredGames } from './useFilteredGames';
import * as FilterStore from '@store/useFilterStore';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import type { Game } from '@typeDefs/game';

vi.mock('@store/useFilterStore');

const mockUseFilterStore = FilterStore.useFilterStore as unknown as Mock;

const mockGames: Game[] = [
  {
    id: 1,
    sport: 'Soccer',
    home_team: 'A',
    away_team: 'B',
    commence_time: new Date('2025-06-16T12:00:00'),
    odds: { home: 1.5, draw: 2.5, away: 3.0 },
  },
  {
    id: 2,
    sport: 'Basketball',
    home_team: 'C',
    away_team: 'D',
    commence_time: new Date('2025-06-17T12:00:00'),
    odds: { home: 1.7, draw: null, away: 2.3 },
  },
];

describe('useFilteredGames', () => {
  const originalDateNow = Date.now;

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-06-17T00:00:00'));
  });

  afterAll(() => {
    vi.useRealTimers();
    Date.now = originalDateNow;
  });

  it('returns only future games when no filters are set', () => {
    mockUseFilterStore.mockReturnValue({
      selectedSport: null,
      selectedDate: null,
    });

    const { result } = renderHook(() => useFilteredGames(mockGames));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe(2);
  });

  it('includes past games when a date is selected', () => {
    mockUseFilterStore.mockReturnValue({
      selectedSport: null,
      selectedDate: new Date('2025-06-16'),
    });

    const { result } = renderHook(() => useFilteredGames(mockGames));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe(1);
  });

  it('filters by selected sport (future only)', () => {
    mockUseFilterStore.mockReturnValue({
      selectedSport: 'Basketball',
      selectedDate: null,
    });

    const { result } = renderHook(() => useFilteredGames(mockGames));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].sport).toBe('Basketball');
  });

  it('filters by selected sport and includes past when date is selected', () => {
    mockUseFilterStore.mockReturnValue({
      selectedSport: 'Soccer',
      selectedDate: new Date('2025-06-16'),
    });

    const { result } = renderHook(() => useFilteredGames(mockGames));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].sport).toBe('Soccer');
  });

  it('returns empty array if filters do not match', () => {
    mockUseFilterStore.mockReturnValue({
      selectedSport: 'Tennis',
      selectedDate: null,
    });

    const { result } = renderHook(() => useFilteredGames(mockGames));

    expect(result.current).toHaveLength(0);
  });
});
