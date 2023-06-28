const ratesFormContainer = <HTMLDivElement>document.querySelector(".form-rates-section");
const seeRatesButtonOption = <HTMLButtonElement>document.querySelector("#see-rates-btn");
const closeRatesButton = <HTMLButtonElement>document.querySelector(".close-rates-btn");
const convertButtonOption = <HTMLButtonElement>document.querySelector("#convert-btn");
const convertForm = <HTMLDivElement>document.querySelector(".form-convert-section");
const backButton = <HTMLButtonElement>document.querySelector(".back-menu-btn");
const tableCurrency = <HTMLTableElement>document.querySelector("#rates-table");
const convertButton = <HTMLButtonElement>document.querySelector("#convert");
const formRates = <HTMLFormElement>document.querySelector(".form-rates");
const showButton = <HTMLButtonElement>document.querySelector("#show");
const overlay = <HTMLDivElement>document.querySelector(".overlay");
const closeConvertButton = <HTMLButtonElement>(
  document.querySelector(".close-convert-btn")
);

type Rates = {
  base: string;
  date: Date;
  country: Array<string>;
  value: Array<number>;
  flagImg: string;
};

type Convert = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
};

function createTableRates(rates: Rates, index: number) {
  const tableBody = <HTMLTableElement>document.querySelector(".tbody");
  const currenciesTableRow = document.createElement("tr");
  const flagCell = document.createElement("td");
  const currencyCell = document.createElement("td");
  const valueCell = document.createElement("td");
  const flagImage = document.createElement("img");

  flagImage.classList.add("flag");
  flagImage.alt = `${rates.country[index]} flag`;
  flagImage.src = rates.flagImg[index];
  currencyCell.textContent = rates.country[index];
  valueCell.textContent = (Math.round(rates.value[index] * 100) / 100).toString();
  currenciesTableRow.setAttribute("class", "table-row-currency");

  flagCell.appendChild(flagImage);
  currenciesTableRow.append(flagCell, currencyCell, valueCell);
  tableBody.appendChild(currenciesTableRow);
}

function showTableRates(apiData: Rates, index: number): void {
  const titleRatesTable = <HTMLTableCaptionElement>document.querySelector("caption");
  const base: string = apiData.base;
  const date: Date = apiData.date;

  titleRatesTable.textContent = `Exchange rates for "${base}" in date: ${date}`;

  createTableRates(apiData, index);

  tableCurrency.classList.remove("hidden");
  ratesFormContainer.classList.add("max-height");
}

backButton.onclick = () => {
  removeTableRates();
};

function removeTableRates() {
  const currencyTableRows = document.querySelectorAll(".table-row-currency");

  ratesFormContainer.classList.remove("max-height");
  ratesFormContainer.classList.remove("move-to-top");
  formRates.classList.remove("hidden");
  tableCurrency.classList.add("hidden");
  closeRatesButton.classList.remove("move-img");
  backButton.classList.add("hidden");
  currencyTableRows.forEach((row) => {
    row.remove();
  });
}

function showConvertResult(apiData: Convert): void {
  const textResult = <HTMLParagraphElement>document.querySelector(".result-convert");
  const from: string = apiData.fromCurrency;
  const to: string = apiData.toCurrency;
  const amount: number = apiData.amount;
  const result: number = apiData.result;

  textResult.textContent = `${amount} ${from} =  ${roundNumber(result)} ${to}`;
  textResult.classList.add("visible");
}

function roundNumber(number: number): number {
  return Math.round(number * 100) / 100;
}

function hideMenu(): void {
  ratesFormContainer.classList.remove("show-to-left");
  convertForm.classList.remove("show-to-left");
  overlay.classList.add("hidden");
}

function showMenu(form: Element): void {
  form.classList.add("show-to-left");
  overlay.classList.remove("hidden");
}

function closeMenu(button: HTMLButtonElement): void {
  overlay.onclick = hideMenu;
  button.onclick = hideMenu;
}

function moveButtonToTop(button: HTMLButtonElement): void {
  button.classList.add("move-img");
}

function moveMenuToTop(menu: HTMLDivElement): void {
  menu.classList.add("move-to-top");
}

function showElement(element: Element): void {
  element.classList.remove("hidden");
}

function hideElement(element: Element): void {
  element.classList.add("hidden");
}

export {
  ratesFormContainer,
  seeRatesButtonOption,
  closeRatesButton,
  convertButtonOption,
  convertButton,
  convertForm,
  backButton,
  formRates,
  showButton,
  closeConvertButton,
  showTableRates,
  removeTableRates,
  showConvertResult,
  showMenu,
  closeMenu,
  moveButtonToTop,
  moveMenuToTop,
  showElement,
  hideElement,
};
