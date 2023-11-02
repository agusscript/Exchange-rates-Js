import ApiData from "../types/api";

const requestApiURL = "https://api.frankfurter.app/";

function getBaseCurrency(currency: string): string {
  return `?base=${currency}`;
}

async function getRates(date: string, base: string): Promise<ApiData> {
  const response = await fetch(requestApiURL + date + base);
  return response.json();
}

function getCurrenciesToConvert(currency1: string, currency2: string): string {
  return `&from=${currency1}&to=${currency2}`;
}

function getAmount(amount: string): string {
  return `latest?amount=${amount}`;
}

async function getConvertData(amount: string, currencies: string): Promise<ApiData> {
  const response = await fetch(requestApiURL + amount + currencies);
  return response.json();
}

export { getBaseCurrency, getRates, getCurrenciesToConvert, getAmount, getConvertData };
