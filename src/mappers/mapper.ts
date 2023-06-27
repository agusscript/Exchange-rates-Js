import { Rates } from "../entities/rates";
import { getFlag } from "../api/flag";

export function mapRates(apiData: any): Rates {
  const country: Array<string> = Object.keys(apiData.rates);
  const value: Array<number> = Object.values(apiData.rates);
  const flagImage = country.map((country) => getFlag(country.slice(0, 2)));

  const rates = new Rates(apiData.base, apiData.date, country, value, flagImage);

  return rates;
}
