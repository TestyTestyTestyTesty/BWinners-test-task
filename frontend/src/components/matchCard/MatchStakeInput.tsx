import { type FC, type ChangeEvent, useCallback } from 'react';
import { messages } from '@messages/messages';
import { getCurrencySymbol } from '@/utils/currency';
import { DEFAULT_CURRENCY } from '@/constants/currency';

interface StakeInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  error?: string;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 1000;

export const MatchStakeInput: FC<StakeInputProps> = ({
  value,
  onChange,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  disabled = false,
  error,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const parsed = parseFloat(input);

      if (input === '') {
        onChange(0);
      } else if (!isNaN(parsed)) {
        onChange(parsed);
      }
    },
    [onChange]
  );

  const inputClassName = [
    'border rounded px-3 py-2 text-sm outline-none transition text-black',
    'focus:ring-2 focus:ring-red-500',
    error ? 'border-red-500' : 'border-gray-300',
  ].join(' ');

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {messages.common.stake} ({getCurrencySymbol(DEFAULT_CURRENCY)})
      </label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={1}
        disabled={disabled}
        className={inputClassName}
        data-testid="stake-input"
      />
      {error && (
        <p className="text-xs text-red-600" data-testid="stake-error">
          {error}
        </p>
      )}
    </div>
  );
};
