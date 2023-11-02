export class Rates {
  constructor(
    public base: string,
    public date: string,
    public country: Array<string>,
    public value: Array<number>,
    public flagImg: Array<string>
  ) {
    this.base = base;
    this.date = date;
    this.country = country;
    this.value = value;
    this.flagImg = flagImg;
  }
}
