export function formatCurrency(price) {
  return `${price.currency_symbol} ${(price.price / 100).toFixed(2)}`;
}
