import type { BetType } from '@typeDefs/bet';
import { type FC } from 'react';

interface MatchOddsButtonProps {
  label: string;
  value: number;
  isSelected?: boolean;
  betType: BetType;
  onClick?: (betType: BetType) => void;
  disabled?: boolean;
}

export const MatchOddsButton: FC<MatchOddsButtonProps> = ({
  label,
  value,
  isSelected = false,
  betType,
  onClick,
  disabled = false,
}) => {
  const baseClasses =
    'transition-colors duration-150 ease-in-out flex flex-col items-center px-3 py-2 rounded border text-sm font-medium';

  const selectedClasses = isSelected
    ? 'bg-red-700 text-white border-red-700'
    : 'bg-white text-gray-900 border-gray-300';

  const hoverClasses = !disabled && !isSelected ? 'hover:bg-gray-100' : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [baseClasses, selectedClasses, hoverClasses, disabledClasses].join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={() => !disabled && onClick?.(betType)}
      disabled={disabled}
    >
      {label}
      <br />
      <span>{value.toFixed(2)}</span>
    </button>
  );
};
