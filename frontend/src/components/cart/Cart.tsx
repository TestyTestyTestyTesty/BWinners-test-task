import { messages } from '@messages/messages';
import { CartSelectionsList } from '@components/cart/CartSelectionList';
import { CartSummary } from '@components/cart/CartSummary';
import { CartActions } from '@components/cart/CartActions';

type CartProps = ReturnType<typeof import('@hooks/useCartLogic').useCartLogic>;

export const Cart = ({
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
}: CartProps) => {
  const isSubmitted = success;

  if (selections.length === 0 && !isSubmitted) {
    return (
      <aside className="bg-white shadow-md rounded-2xl p-6 text-sm w-full border border-gray-200">
        <p className="text-center text-gray-700">{messages.cart.add_bets_to_continue}</p>
      </aside>
    );
  }

  return (
    <aside className="bg-white shadow-md rounded-2xl p-6 text-sm w-full border border-gray-200">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {isSubmitted ? messages.cart.submitted_bets : messages.cart.your_bets}
        </h2>

        <CartSelectionsList
          selections={selections}
          isSubmitted={isSubmitted}
          onRemove={removeSelection}
        />

        <CartSummary
          totalBets={selections.length}
          totalStake={totalStake}
          potentialWinnings={totalStake * totalOdds}
        />

        <CartActions
          isSubmitted={isSubmitted}
          submitting={submitting}
          success={success}
          error={error}
          localError={localError}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
      </div>
    </aside>
  );
};
