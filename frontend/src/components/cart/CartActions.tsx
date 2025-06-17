import { messages } from '@messages/messages';

interface CartActionsProps {
  isSubmitted: boolean;
  submitting: boolean;
  success: boolean;
  error: string | null;
  localError: string | null;
  termsAccepted: boolean;
  setTermsAccepted: (checked: boolean) => void;
  handleSubmit: () => void;
  handleReset: () => void;
}

export const CartActions = ({
  isSubmitted,
  submitting,
  success,
  error,
  localError,
  termsAccepted,
  setTermsAccepted,
  handleSubmit,
  handleReset,
}: CartActionsProps) => {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {!isSubmitted && (
        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="accent-red-500"
          />
          <label htmlFor="terms" className="text-gray-600 text-sm">
            {messages.cart.accept_terms_and_conditions}
          </label>
        </div>
      )}

      {(localError || error) && <p className="text-sm text-red-600">{localError || error}</p>}

      {success && <p className="text-sm text-green-600">{messages.cart.bet_has_been_placed}</p>}

      <button
        className={`w-full cursor-pointer ${
          isSubmitted
            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } py-2 rounded-lg transition disabled:opacity-50`}
        onClick={isSubmitted ? handleReset : handleSubmit}
        disabled={submitting || (!isSubmitted && !termsAccepted)}
      >
        {isSubmitted
          ? messages.cart.place_another_bet
          : submitting
            ? messages.cart.submitting
            : messages.cart.place_bet}
      </button>
    </div>
  );
};
