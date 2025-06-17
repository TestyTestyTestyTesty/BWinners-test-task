import * as BetSlipStore from '@store/useBetSlipStore';
import { act, renderHook } from '@testing-library/react';
import type { Odds } from '@typeDefs/game';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMatchBetting } from './useMatchBetting';
import type { Mock } from 'vitest';

vi.mock('@store/useBetSlipStore');

const mockAddSelection = vi.fn();
const mockRemoveSelection = vi.fn();

const mockOdds: Odds = {
  home: 1.8,
  draw: 3.2,
  away: 2.1,
};

const mockParams = {
  matchId: 1,
  sport: 'Soccer',
  homeTeam: 'Team A',
  awayTeam: 'Team B',
  odds: mockOdds,
};

describe('useMatchBetting', () => {
  beforeEach(() => {
    (BetSlipStore.useBetSlipStore as unknown as Mock).mockReturnValue({
      selections: [],
      addSelection: mockAddSelection,
      removeSelection: mockRemoveSelection,
      locked: false,
    });

    mockAddSelection.mockReset();
    mockRemoveSelection.mockReset();
  });

  it('should initialize default state correctly', () => {
    const { result } = renderHook(() => useMatchBetting(mockParams));

    expect(result.current.tempBetType).toBeNull();
    expect(result.current.tempStake).toBe(10);
    expect(result.current.isInSlip).toBe(false);
    expect(result.current.locked).toBe(false);
    expect(result.current.bettingOptions).toHaveLength(3); // because Soccer is drawable
  });

  it('should update bet type', () => {
    const { result } = renderHook(() => useMatchBetting(mockParams));

    act(() => {
      result.current.handleSelectBet('home');
    });

    expect(result.current.tempBetType).toBe('home');
  });

  it('should update stake', () => {
    const { result } = renderHook(() => useMatchBetting(mockParams));

    act(() => {
      result.current.handleStakeChange(50);
    });

    expect(result.current.tempStake).toBe(50);
  });

  it('should NOT call addSelection with invalid stake', () => {
    const { result } = renderHook(() => useMatchBetting(mockParams));

    act(() => {
      result.current.handleSelectBet('home');
      result.current.handleStakeChange(0); // Invalid
      result.current.handleAddBet();
    });

    expect(mockAddSelection).not.toHaveBeenCalled();
  });

  it('should return correct isInSlip value if selection exists', () => {
    (BetSlipStore.useBetSlipStore as unknown as Mock).mockReturnValue({
      selections: [
        { matchId: 1, stake: 10, betType: 'home', homeTeam: 'A', awayTeam: 'B', odds: mockOdds },
      ],
      addSelection: mockAddSelection,
      removeSelection: mockRemoveSelection,
      locked: false,
    });

    const { result } = renderHook(() => useMatchBetting(mockParams));

    expect(result.current.isInSlip).toBe(true);
  });
});
