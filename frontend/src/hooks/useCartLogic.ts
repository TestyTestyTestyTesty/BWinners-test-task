import { useState, useMemo } from 'react';
import { useBetSlipStore } from '@store/useBetSlipStore';
import { useSubmitBets } from '@hooks/useSubmitBets';
import { messages } from '@messages/messages';
import type { BetSelection } from '@typeDefs/bet';

export const useCartLogic = () => {
  const { selections, removeSelection, resetSelections } = useBetSlipStore();
  const { submitBets, submitting, success, error, resetStatus } = useSubmitBets();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const totalStake = useMemo(
    () => selections.reduce((acc, item) => acc + item.stake, 0),
    [selections]
  );

  const totalOdds = useMemo(() => {
    const getOdd = (item: BetSelection) => {
      if (item.betType === 'home') return item.odds.home;
      if (item.betType === 'away') return item.odds.away;
      return item.odds.draw ?? 1;
    };

    return selections.reduce((acc, item) => {
      const odd = getOdd(item);
      return acc * odd;
    }, 1);
  }, [selections]);

  const handleSubmit = async () => {
    resetStatus();
    setLocalError(null);

    if (!termsAccepted) {
      setLocalError(messages.errors.accept_terms);
      return;
    }

    if (selections.length === 0) {
      setLocalError(messages.cart.add_at_least_one_bet);
      return;
    }

    await submitBets(selections);
  };

  const handleReset = () => {
    resetSelections();
    resetStatus();
    setTermsAccepted(false);
    setLocalError(null);
  };

  return {
    selections,
    submitting,
    success,
    error,
    localError,
    totalStake,
    totalOdds,
    termsAccepted,
    setTermsAccepted,
    handleSubmit,
    handleReset,
    removeSelection,
  };
};
