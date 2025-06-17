import { DEFAULT_CURRENCY } from '@constants/currency';
import { getCurrencySymbol } from '@utils/currency';
import { messages } from '@messages/messages';
import type { BetSelection } from '@store/useBetSlipStore';

interface CartSelectionsListProps {
  selections: BetSelection[];
  isSubmitted: boolean;
  onRemove: (matchId: number) => void;
}

export const CartSelectionsList = ({
  selections,
  isSubmitted,
  onRemove,
}: CartSelectionsListProps) => {
  return (
    <ul className="divide-y divide-gray-200">
      {selections.map((sel) => (
        <li key={sel.matchId} className="py-3 flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <div className="text-gray-800 font-semibold">
              {sel.homeTeam} <span className="text-gray-500">{messages.common.vs}</span>{' '}
              {sel.awayTeam}
            </div>

            {!isSubmitted && (
              <button
                onClick={() => onRemove(sel.matchId)}
                className="text-red-600 text-xs font-medium hover:underline cursor-pointer"
              >
                {messages.cart.remove}
              </button>
            )}
          </div>

          <div className="flex justify-between text-gray-700 text-sm">
            <span>
              <strong>{messages.cart.bet}</strong>: {sel.betType.toUpperCase()}
            </span>
            <span>
              <strong>{messages.cart.stake}</strong>: {sel.stake} (
              {getCurrencySymbol(DEFAULT_CURRENCY)})
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
