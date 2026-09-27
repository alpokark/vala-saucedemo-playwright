// Prices are handled in integer cents so totals can be compared exactly.
export function toCents(text: string): number {
  const match = /\$(\d+\.\d{2})/.exec(text);
  if (!match) {
    throw new Error(`No price found in "${text}"`);
  }
  return Math.round(Number(match[1]) * 100);
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
