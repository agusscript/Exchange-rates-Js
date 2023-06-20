export const requestApiURL = "https://api.exchangerate.host/";

export function getBaseCurrency(currency) {
  return `?base=${currency}`;
}

export async function getRates(date, base) {
  const response = await fetch(requestApiURL + date + base);
  return response.json();
}

export function getCurrenciesToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

export function getAmount(amount) {
  return `&amount=${amount}`;
}

export async function getConvertData(currencies, amount) {
  const response = await fetch(requestApiURL + currencies + amount);
  return response.json();
}
