import { type FC } from 'react';

import { messages } from '@messages/messages';

interface MobileCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileCartDrawer: FC<MobileCartDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-40">
        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
        >
          {messages.cart.view_cart}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">{messages.cart.your_bets}</h2>
          <button onClick={onClose} className="text-sm text-red-600 font-medium hover:underline">
            {messages.cart.close_cart}
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">{children}</div>
      </div>
    </>
  );
};
