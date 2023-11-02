import { Rates } from "../entities/rates";
import { Convert } from "../entities/convert";
import { getFlag } from "../api/flag";
import ApiData from "../types/api";

export function mapRates(apiData: ApiData): Rates {
  const country: Array<string> = Object.keys(apiData.rates);
  const value: Array<number> = Object.values(apiData.rates);
  const flagImage: Array<string> = country.map((country) => getFlag(country.slice(0, 2)));

  const rates = new Rates(apiData.base, apiData.date, country, value, flagImage);

  return rates;
}

export function mapConvert(apiData: ApiData): Convert {
  const fromCurrency: string = apiData.base;
  const toCurrency: string = Object.keys(apiData.rates)[0];
  const amount: number = apiData.amount;
  const result: number = Object.values(apiData.rates)[0];

  const convert = new Convert(fromCurrency, toCurrency, amount, result);

  return convert;
}
