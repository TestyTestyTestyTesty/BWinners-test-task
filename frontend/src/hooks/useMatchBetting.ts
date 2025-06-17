import { useState, useMemo } from 'react';
import { isDrawableSport } from '@constants/sports';
import { useBetSlipStore } from '@store/useBetSlipStore';
import type { BetType, BettingOption } from '@typeDefs/bet';
import type { Odds } from '@typeDefs/game';
import { isBefore } from 'date-fns';

interface UseMatchBettingParams {
  matchId: number;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  odds: Odds;
  commenceTime: string;
}

export const useMatchBetting = ({
  matchId,
  sport,
  homeTeam,
  awayTeam,
  odds,
  commenceTime,
}: UseMatchBettingParams) => {
  const { selections, addSelection, removeSelection, locked } = useBetSlipStore();

  const [tempBetType, setTempBetType] = useState<BetType | null>(null);
  const [tempStake, setTempStake] = useState<number>(10);

  const selection = selections.find((s) => s.matchId === matchId);
  const isInSlip = !!selection;

  const bettingOptions: BettingOption[] = useMemo(() => {
    const base: BettingOption[] = [
      { label: '1', value: odds.home, betType: 'home' },
      { label: '2', value: odds.away, betType: 'away' },
    ];
    if (isDrawableSport(sport)) {
      base.splice(1, 0, { label: 'X', value: odds.draw ?? 0, betType: 'draw' });
    }
    return base;
  }, [odds, sport]);

  const matchFinished = isBefore(new Date(commenceTime), new Date());

  const handleSelectBet = (betType: BetType) => setTempBetType(betType);
  const handleStakeChange = (newStake: number) => setTempStake(newStake);
  const handleAddBet = () => {
    if (!tempBetType || tempStake < 1 || tempStake > 1000) return;
    addSelection({ matchId, betType: tempBetType, stake: tempStake, odds, awayTeam, homeTeam });
  };

  return {
    tempBetType,
    setTempBetType,
    tempStake,
    setTempStake,
    isInSlip,
    locked,
    bettingOptions,
    handleSelectBet,
    handleStakeChange,
    handleAddBet,
    removeSelection,
    matchFinished,
  };
};
