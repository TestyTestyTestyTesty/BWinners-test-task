import type { BetType } from '@typeDefs/bet';
import { type FC } from 'react';

interface MatchOddsButtonProps {
  label: string;
  value: number;
  isSelected?: boolean;
  betType: BetType;
  onClick?: (betType: BetType) => void;
}

export const MatchOddsButton: FC<MatchOddsButtonProps> = ({
  label,
  value,
  isSelected = false,
  betType,
  onClick,
}) => {
  const buttonClasses = `transition-colors duration-150 ease-in-out flex flex-col items-center px-3 py-2 rounded border text-sm font-medium cursor-pointer ${
    isSelected
      ? 'bg-red-700 text-white border-red-700'
      : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
  }`;

  return (
    <button className={buttonClasses} onClick={() => onClick?.(betType)}>
      {label}
      <br />
      <span>{value.toFixed(2)}</span>
    </button>
  );
};
