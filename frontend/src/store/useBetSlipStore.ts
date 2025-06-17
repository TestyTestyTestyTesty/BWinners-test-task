import { create } from 'zustand';
import type { Odds } from '@typeDefs/game';
import type { BetType } from '@typeDefs/bet';

export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  betType: BetType;
  stake: number;
  odds: Odds;
}

type BetSlipState = {
  selections: BetSelection[];
  locked: boolean;

  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: number) => void;
  updateStake: (matchId: number, stake: number) => void;
  updateBetType: (matchId: number, betType: BetType) => void;

  resetSelections: () => void;
  lock: () => void;
  unlock: () => void;
};

export const useBetSlipStore = create<BetSlipState>((set) => ({
  selections: [],
  locked: false,

  addSelection: (selection) =>
    set((state) => {
      if (state.locked) return state;
      const exists = state.selections.some((s) => s.matchId === selection.matchId);
      if (exists) return state;
      return { selections: [...state.selections, selection] };
    }),

  removeSelection: (matchId) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.matchId !== matchId),
    })),

  updateStake: (matchId, stake) =>
    set((state) => ({
      selections: state.selections.map((s) => (s.matchId === matchId ? { ...s, stake } : s)),
    })),

  updateBetType: (matchId, betType) =>
    set((state) => ({
      selections: state.selections.map((s) => (s.matchId === matchId ? { ...s, betType } : s)),
    })),

  resetSelections: () => set({ selections: [], locked: false }),

  lock: () => set({ locked: true }),

  unlock: () => set({ locked: false }),
}));
