import {
  showTableRates,
  showConvertResult,
  closeMenu,
  showMenu,
  moveButtonToTop,
  moveMenuToTop,
  showElement,
  hideElement,
  ratesFormContainer,
  convertForm,
  formRates,
  closeConvertButton,
  closeRatesButton,
  backButton,
  seeRatesButtonOption,
  convertButtonOption,
  convertButton,
  showButton,
} from "./ui/ui.js";

import {
  getBaseCurrency,
  getRates,
  getCurrenciesToConvert,
  getAmount,
  getConvertData,
} from "./api/exchange.js";

import { mapRates } from "./mappers/mapper.js";

async function showRates(): Promise<void> {
  const currencySelect = <HTMLSelectElement>document.querySelector("#currency-select");
  const date: string = validateDate();
  const baseCurrency: string = getBaseCurrency(currencySelect.value);

  try {
    const dataRatesApi = await getRates(date, baseCurrency);
    const rates = mapRates(dataRatesApi);
    renderTableRates(rates);
  } catch (error) {
    console.error("Failed", error);
  }
}

function renderTableRates(rates: any): void {
  const countriesNumber: number = rates.country.length;
  for (let i = 0; i < countriesNumber; i++) {
    showTableRates(rates, i);
  }
}

function validateDate(): string {
  const inputDate = <HTMLInputElement>document.querySelector("#date");
  const currentDate = new Date().toJSON().slice(0, 10);
  inputDate.setAttribute("max", currentDate);

  return inputDate.value === "" ? currentDate : inputDate.value;
}

function showConvertedCurrencies(): void {
  const fromCurrencySelect = <HTMLSelectElement>document.querySelector("#from-currency");
  const toCurrencySelect = <HTMLSelectElement>document.querySelector("#to-currency");
  const amountInput = <HTMLInputElement>document.querySelector("#amount");
  const currenciesToConvert: string = getCurrenciesToConvert(
    fromCurrencySelect.value,
    toCurrencySelect.value
  );
  const amount: string = getAmount(amountInput.value);

  getConvertData(currenciesToConvert, amount)
    .then((data) => showConvertResult(data))
    .catch((error) => console.error("Failed", error));
}

seeRatesButtonOption.onclick = () => {
  showMenu(ratesFormContainer);
  validateDate();
  closeMenu(closeRatesButton);
};

convertButtonOption.onclick = () => {
  showMenu(convertForm);
  closeMenu(closeConvertButton);
};

showButton.onclick = () => {
  showRates();
  hideElement(formRates);
  showElement(backButton);
  moveMenuToTop(ratesFormContainer);
  moveButtonToTop(closeRatesButton);
  moveButtonToTop(backButton);
  event?.preventDefault();
};

convertButton.onclick = () => {
  showConvertedCurrencies();
  event?.preventDefault();
};
