export const DEFAULT_CURRENCY = 'EUR';

export const currencySymbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export type CurrencyCode = keyof typeof currencySymbols;
