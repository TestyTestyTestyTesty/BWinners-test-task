import { placeBets } from '@api/bets';
import { useSubmitBets } from '@hooks/useSubmitBets';
import type { BetSelection } from '@store/useBetSlipStore';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@api/bets', () => ({
  placeBets: vi.fn(),
}));

const lock = vi.fn();
const unlock = vi.fn();

vi.mock('@store/useBetSlipStore', async () => {
  const actual =
    await vi.importActual<typeof import('@store/useBetSlipStore')>('@store/useBetSlipStore');
  return {
    ...actual,
    useBetSlipStore: vi.fn().mockImplementation((selector) =>
      selector({
        lock,
        unlock,
      })
    ),
  };
});

describe('useSubmitBets', () => {
  const dummyBets: BetSelection[] = [
    {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      betType: 'home',
      stake: 100,
      odds: { home: 1.5, draw: 3.2, away: 2.8 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles successful bet submission', async () => {
    (placeBets as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useSubmitBets());

    await act(async () => {
      await result.current.submitBets(dummyBets);
    });

    expect(placeBets).toHaveBeenCalledWith(dummyBets);
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.submitting).toBe(false);
    expect(lock).toHaveBeenCalled();
  });

  it('handles failed bet submission', async () => {
    (placeBets as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('API failure'));

    const { result } = renderHook(() => useSubmitBets());

    await act(async () => {
      await result.current.submitBets(dummyBets);
    });

    expect(placeBets).toHaveBeenCalled();
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('API failure');
    expect(result.current.submitting).toBe(false);
    expect(lock).not.toHaveBeenCalled();
  });

  it('resets status correctly', () => {
    const { result } = renderHook(() => useSubmitBets());

    act(() => {
      result.current.resetStatus();
    });

    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe(null);
    expect(unlock).toHaveBeenCalled();
  });
});
