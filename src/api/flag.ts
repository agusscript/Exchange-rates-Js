export function getFlag(currencyCode: string): string {
  const flagURL = "https://flagsapi.com/";

  return `${flagURL}${currencyCode}/flat/64.png`;
}
