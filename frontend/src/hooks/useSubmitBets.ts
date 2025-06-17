import { placeBets } from '@api/bets';
import type { BetSelection } from '@store/useBetSlipStore';
import { useRef, useState } from 'react';
import { useBetSlipStore } from '@store/useBetSlipStore';

export const useSubmitBets = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successRef = useRef(false);

  const lock = useBetSlipStore((state) => state.lock);
  const unlock = useBetSlipStore((state) => state.unlock);

  const submitBets = async (bets: BetSelection[]) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    successRef.current = false;

    try {
      await placeBets(bets);
      setSuccess(true);
      successRef.current = true;
      lock();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSuccess(false);
    successRef.current = false;
    setError(null);
    unlock();
  };

  return {
    submitBets,
    submitting,
    success,
    error,
    resetStatus,
  };
};
