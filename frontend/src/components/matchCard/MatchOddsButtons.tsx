import { MatchOddsButton } from '@/components/matchCard/MatchOddsButton';
import { type FC } from 'react';
import type { BetType, BettingOption } from '@typeDefs/bet';

export interface MatchOddsButtonsProps {
  options: BettingOption[];
  selected?: BetType;
  onSelect?: (betType: BetType) => void;
  disabled?: boolean;
}

export const MatchOddsButtons: FC<MatchOddsButtonsProps> = ({
  options,
  selected,
  onSelect,
  disabled = false,
}) => {
  const colClass =
    options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-1';

  return (
    <div className={`grid ${colClass} gap-1`}>
      {options.map(({ label, value, betType }) => (
        <MatchOddsButton
          key={betType}
          label={label}
          value={value}
          betType={betType}
          isSelected={selected === betType}
          onClick={() => onSelect?.(betType)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
