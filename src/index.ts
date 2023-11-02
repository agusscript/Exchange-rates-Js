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
  fillOptions,
} from "./ui/ui.js";
import {
  getBaseCurrency,
  getRates,
  getCurrenciesToConvert,
  getAmount,
  getConvertData,
} from "./api/exchange.js";
import { mapRates, mapConvert } from "./mappers/mapper.js";

async function showRates(): Promise<void> {
  const currencySelect = <HTMLSelectElement>document.querySelector("#currency-select");

  const baseCurrency: string = getBaseCurrency(currencySelect.value);
  const date: string = validateDate();

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

async function showConvertedCurrencies(): Promise<void> {
  const fromCurrency = <HTMLSelectElement>document.querySelector("#from-currency");
  const toCurrency = <HTMLSelectElement>document.querySelector("#to-currency");
  const amountInput = <HTMLInputElement>document.querySelector("#amount");

  const amount: string = getAmount(amountInput.value);
  const currencies: string = getCurrenciesToConvert(fromCurrency.value, toCurrency.value);

  try {
    const dataConvertApi = await getConvertData(amount, currencies);
    const convert = mapConvert(dataConvertApi);
    showConvertResult(convert);
  } catch (error) {
    console.error("Failed", error);
  }
}

seeRatesButtonOption.onclick = () => {
  showMenu(ratesFormContainer);
  validateDate();
  closeMenu(closeRatesButton);
};

convertButtonOption.onclick = async () => {
  const latestCurrencies = await getRates("latest", "");
  const options = Object.keys(latestCurrencies.rates);
  console.log(latestCurrencies);

  fillOptions(options);
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
