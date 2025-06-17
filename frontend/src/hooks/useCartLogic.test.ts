import { renderHook, act } from '@testing-library/react';
import { useCartLogic } from './useCartLogic';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as BetSlipStore from '@store/useBetSlipStore';
import * as SubmitBetsHook from '@hooks/useSubmitBets';
import { messages } from '@messages/messages';
import type { Mock } from 'vitest';

vi.mock('@store/useBetSlipStore');
vi.mock('@hooks/useSubmitBets');

const mockSubmitBets = vi.fn();
const mockResetStatus = vi.fn();
const mockRemoveSelection = vi.fn();
const mockResetSelections = vi.fn();

const mockSelection = {
  matchId: 1,
  homeTeam: 'A',
  awayTeam: 'B',
  betType: 'home',
  stake: 100,
  odds: {
    home: 1.5,
    draw: 3.0,
    away: 2.2,
  },
};

describe('useCartLogic', () => {
  beforeEach(() => {
    (BetSlipStore.useBetSlipStore as unknown as Mock).mockReturnValue({
      selections: [mockSelection],
      removeSelection: mockRemoveSelection,
      resetSelections: mockResetSelections,
    });

    (SubmitBetsHook.useSubmitBets as unknown as Mock).mockReturnValue({
      submitBets: mockSubmitBets,
      submitting: false,
      success: false,
      error: null,
      resetStatus: mockResetStatus,
    });

    mockSubmitBets.mockReset();
    mockResetStatus.mockReset();
    mockRemoveSelection.mockReset();
    mockResetSelections.mockReset();
  });

  it('calculates totalStake and totalOdds correctly', () => {
    const { result } = renderHook(() => useCartLogic());

    expect(result.current.totalStake).toBe(100);
    expect(result.current.totalOdds).toBe(1.5);
  });

  it('returns local error if terms are not accepted', async () => {
    const { result } = renderHook(() => useCartLogic());

    await act(() => result.current.handleSubmit());

    expect(result.current.localError).toBe(messages.errors.accept_terms);
    expect(mockSubmitBets).not.toHaveBeenCalled();
  });

  it('returns local error if no selections', async () => {
    (BetSlipStore.useBetSlipStore as unknown as Mock).mockReturnValue({
      selections: [],
      removeSelection: mockRemoveSelection,
      resetSelections: mockResetSelections,
    });

    const { result } = renderHook(() => useCartLogic());

    act(() => {
      result.current.setTermsAccepted(true);
    });

    await act(() => result.current.handleSubmit());

    expect(result.current.localError).toBe(messages.cart.add_at_least_one_bet);
    expect(mockSubmitBets).not.toHaveBeenCalled();
  });

  it('calls submitBets when terms accepted and selections exist', async () => {
    const { result } = renderHook(() => useCartLogic());

    act(() => {
      result.current.setTermsAccepted(true);
    });

    await act(() => result.current.handleSubmit());

    expect(mockSubmitBets).toHaveBeenCalledWith([mockSelection]);
    expect(result.current.localError).toBeNull();
  });

  it('resets state on handleReset', () => {
    const { result } = renderHook(() => useCartLogic());

    act(() => {
      result.current.setTermsAccepted(true);
      result.current.handleReset();
    });

    expect(mockResetSelections).toHaveBeenCalled();
    expect(mockResetStatus).toHaveBeenCalled();
    expect(result.current.termsAccepted).toBe(false);
    expect(result.current.localError).toBeNull();
  });
});
