import {
  validateDate,
  getBaseCurrency,
  getRates,
  getCurrencysToConvert,
  getAmount,
  getConvertData
} from "./exchange.js";

import {
  showTableRates,
  removeTableRates,
  showConvertResult,
  closeMenu,
  showMenu,
  moveButtonToTop,
  moveMenuToTop,
  showElement,
  hideElement,
  $ratesFormContainer,
  $convertForm,
  $formRates,
  $closeButton,
  $backButton,
} from "./ui.js";

function showRates() {
  const $currencySelect = document.querySelector("#currency-select");
  let selectedDate = validateDate();
  let selectedBaseCurrency = getBaseCurrency($currencySelect.value);

  getRates(selectedDate, selectedBaseCurrency)
    .then((data) => {
      showTableRates(data);
    })
    .catch((error) => console.error("Failed", error));
}

function showConvertedCurrencies() {
  const $selectFromCurrency = document.querySelector("#from-currency");
  const $selectToCurrency = document.querySelector("#to-currency");
  const $inputAmount = document.querySelector("#amount");
  let selectedCurrenciesToConvert = getCurrencysToConvert(
    $selectFromCurrency.value,
    $selectToCurrency.value
  );
  let selectedAmount = getAmount($inputAmount.value);

  getConvertData(selectedCurrenciesToConvert, selectedAmount)
    .then((data) => {
      showConvertResult(data);
    })
    .catch((error) => console.error("Failed", error));
}

document.querySelector("#see-rates-btn").addEventListener("click", () => {
  showMenu($ratesFormContainer);
  validateDate();
  closeMenu();
});

document.querySelector("#convert-btn").addEventListener("click", () => {
  showMenu($convertForm);
  closeMenu();
});

document.querySelector("#show").addEventListener("click", () => {
  showRates();
  hideElement($formRates);
  showElement($backButton);
  moveMenuToTop($ratesFormContainer);
  moveButtonToTop($closeButton);
  moveButtonToTop($backButton);
  event.preventDefault();
});

$backButton.addEventListener("click", () => {
  removeTableRates();
});

document.querySelector("#convert").addEventListener("click", () => {
  showConvertedCurrencies();
  event.preventDefault();
});