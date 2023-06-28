export class Convert {
  constructor(
    public fromCurrency: string,
    public toCurrency: string,
    public amount: number,
    public result: number
  ) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.amount = amount;
    this.result = result;
  }
}
