import { Rates } from "../entities/rates";
import { Convert } from "../entities/convert";
import { getFlag } from "../api/flag";

export function mapRates(apiData: any): Rates {
  const country: Array<string> = Object.keys(apiData.rates);
  const value: Array<number> = Object.values(apiData.rates);
  const flagImage = country.map((country) => getFlag(country.slice(0, 2)));

  const rates = new Rates(apiData.base, apiData.date, country, value, flagImage);

  return rates;
}

export function mapConvert(apiData: any): Convert {
  const fromCurrency: string = apiData.query.from;
  const toCurrency: string = apiData.query.to;
  const amount: number = apiData.query.amount;
  const result: number = apiData.result;

  const convert = new Convert(fromCurrency, toCurrency, amount, result);

  return convert;
}
