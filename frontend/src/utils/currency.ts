import { currencySymbols, DEFAULT_CURRENCY, type CurrencyCode } from '@constants/currency';

export function formatCurrency(amount: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getCurrencySymbol(currency: CurrencyCode = DEFAULT_CURRENCY): string {
  return currencySymbols[currency] ?? currency;
}
