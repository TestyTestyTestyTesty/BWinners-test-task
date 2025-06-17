import { DEFAULT_CURRENCY } from '@/constants/currency';
import { getCurrencySymbol } from '@/utils/currency';
import { messages } from '@messages/messages';

interface CartSummaryProps {
  totalBets: number;
  totalStake: number;
  potentialWinnings: number;
}

export const CartSummary = ({ totalBets, totalStake, potentialWinnings }: CartSummaryProps) => {
  return (
    <div className="space-y-1 text-gray-700 text-sm border-t pt-3">
      <p>
        <strong>{messages.cart.number_of_bets}</strong>: {totalBets}
      </p>
      <p>
        <strong>{messages.cart.total_stake}</strong>: {totalStake} (
        {getCurrencySymbol(DEFAULT_CURRENCY)})
      </p>
      <p>
        <strong>{messages.cart.potential_winnings}</strong>: {potentialWinnings.toFixed(2)} (
        {getCurrencySymbol(DEFAULT_CURRENCY)})
      </p>
    </div>
  );
};
