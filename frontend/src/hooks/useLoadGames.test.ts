import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLoadGames } from '@hooks/useLoadGames';
import { fetchGames } from '@api/games';
import { messages } from '@messages/messages';
import type { Game } from '@typeDefs/game';

vi.mock('@api/games', () => ({
  fetchGames: vi.fn(),
}));

describe('useLoadGames', () => {
  const mockGames: Game[] = [
    {
      id: 1,
      commence_time: new Date('2023-10-01T12:00:00Z'),
      sport: 'Soccer',
      home_team: 'Team A',
      away_team: 'Team B',
      odds: { home: 1.5, draw: 3.2, away: 2.8 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads games successfully', async () => {
    (fetchGames as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockGames);

    const { result } = renderHook(() => useLoadGames());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.games).toEqual(mockGames);
    expect(result.current.error).toBeNull();
  });

  it('handles error when fetching games fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (fetchGames as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API failed'));

    const { result } = renderHook(() => useLoadGames());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.games).toEqual([]);
    expect(result.current.error).toBe(messages.errors.failed_to_load_games);

    errorSpy.mockRestore(); // Restore original after test
  });
});
