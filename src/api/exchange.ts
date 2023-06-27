const requestApiURL = "https://api.exchangerate.host/";

function getBaseCurrency(currency: string): string {
  return `?base=${currency}`;
}

async function getRates(date: string, base: string): Promise<object> {
  const response = await fetch(requestApiURL + date + base);
  return response.json();
}

function getCurrenciesToConvert(currency1: string, currency2: string): string {
  return `convert?from=${currency1}&to=${currency2}`;
}

function getAmount(amount: string): string {
  return `&amount=${amount}`;
}

async function getConvertData(currencies: string, amount: string): Promise<object> {
  const response = await fetch(requestApiURL + currencies + amount);
  return response.json();
}

export { getBaseCurrency, getRates, getCurrenciesToConvert, getAmount, getConvertData };
