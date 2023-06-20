import {
  getBaseCurrency,
  getRates,
  getCurrenciesToConvert,
  getAmount,
  getConvertData,
} from "./api/exchange-api.js";

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
} from "./ui/ui.js";

function validateDate() {
  const $inputDate = document.querySelector("#date");
  const currentDate = new Date().toJSON().slice(0, 10);
  $inputDate.setAttribute("max", currentDate);
  if ($inputDate.value === "") {
    return currentDate;
  } else {
    return $inputDate.value;
  }
}

function showRates() {
  const $currencySelect = document.querySelector("#currency-select");
  const date = validateDate();
  const baseCurrency = getBaseCurrency($currencySelect.value);

  getRates(date, baseCurrency)
    .then((data) => showTableRates(data))
    .catch((error) => console.error("Failed", error));
}

function showConvertedCurrencies() {
  const $fromCurrencySelect = document.querySelector("#from-currency");
  const $toCurrencySelect = document.querySelector("#to-currency");
  const $amountInput = document.querySelector("#amount");
  const $currenciesToConvert = getCurrenciesToConvert(
    $fromCurrencySelect.value,
    $toCurrencySelect.value
  );
  const amount = getAmount($amountInput.value);

  getConvertData($currenciesToConvert, amount)
    .then((data) => showConvertResult(data))
    .catch((error) => console.error("Failed", error));
}

document.querySelector("#see-rates-btn").onclick = () => {
  showMenu($ratesFormContainer);
  validateDate();
  closeMenu();
};

document.querySelector("#convert-btn").onclick = () => {
  showMenu($convertForm);
  closeMenu();
};

document.querySelector("#show").onclick = () => {
  showRates();
  hideElement($formRates);
  showElement($backButton);
  moveMenuToTop($ratesFormContainer);
  moveButtonToTop($closeButton);
  moveButtonToTop($backButton);
  event.preventDefault();
};

$backButton.onclick = () => {
  removeTableRates();
};

document.querySelector("#convert").onclick = () => {
  showConvertedCurrencies();
  event.preventDefault();
};
