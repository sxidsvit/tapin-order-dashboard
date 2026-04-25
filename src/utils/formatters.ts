// src/utils/formatters.ts

/**
 * Formats a value in cents into a USD currency string.
 * @param cents - The amount in cents (e.g., 1050 for $10.50)
 */
export const formatCurrency = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
};