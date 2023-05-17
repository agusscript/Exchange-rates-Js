export function getFlag(currencyCode) {
    const flagURL = "https://flagsapi.com/";

    return `${flagURL}${currencyCode}/flat/64.png`;
}