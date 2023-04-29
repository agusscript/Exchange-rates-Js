import {
  validateDate,
  getBaseCurrency,
  getRates,
  getCurrencysToConvert,
  getAmount,
  getConvertData,
  getFlags,
} from "./exchange.js";

const $ratesFormContainer = document.querySelector(".form-rates-section");
const $formRates = document.querySelector(".form-rates");
const $convertForm = document.querySelector(".form-convert-section");
const $tableCurrency = document.querySelector("#rates-table");
const $overlay = document.querySelector(".overlay");
const $backButton = document.querySelector(".back-menu-img");
const $closeButton = document.querySelector(".close-menu-img");

function createTableRates(data, currency) {
  const currenciesTableRow = document.createElement("tr");
  const flagCell = document.createElement("td");
  const currencyCell = document.createElement("td");
  const valueCell = document.createElement("td");
  const flagImage = document.createElement("img");

  flagImage.alt = `${currency} flag`;
  flagImage.classList.add("flag");
  flagImage.src = getFlags(currency.slice(0, 2));
  currencyCell.textContent = currency;
  valueCell.textContent = Math.round(data.rates[currency] * 100) / 100;

  currenciesTableRow.setAttribute("class", "table-row-currency");

  flagCell.appendChild(flagImage);
  currenciesTableRow.append(flagCell, currencyCell, valueCell);
  $tableCurrency.querySelector("tbody").appendChild(currenciesTableRow);
}

function showTableRates(data) {
  const $titleRatesTable = document.querySelector("caption");
  $titleRatesTable.textContent = `Exchange rates for "${data.base}" in date: ${data.date}`;

  Object.keys(data.rates).forEach((currency) => {
    createTableRates(data, currency);
  });

  $tableCurrency.classList.remove("occult");
  $ratesFormContainer.classList.add("max-height");
}

function removeTableRates() {
  const $currencyTableRows = document.querySelectorAll(".table-row-currency");

  $ratesFormContainer.classList.remove("max-height");
  $ratesFormContainer.classList.remove("move-to-top");
  $formRates.classList.remove("occult");
  $tableCurrency.classList.add("occult");
  $closeButton.classList.remove("move-img");
  $backButton.classList.add("occult");
  $currencyTableRows.forEach((row) => {
    row.remove();
  });
}

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

function showConvertResult(data) {
  const resultText = document.querySelector(".result-convert");
  resultText.textContent = `${data.query.amount} ${data.query.from} = 
  ${Math.round(data.result * 100) / 100} ${data.query.to}`;
  resultText.classList.add("visible");
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

function hideMenu() {
  $ratesFormContainer.classList.remove("show-to-left");
  $convertForm.classList.remove("show-to-left");
  $overlay.classList.add("occult");
}

function closeMenu() {
  $overlay.onclick = hideMenu;

  document.querySelectorAll(".close-menu-img").forEach((e) => {
    e.onclick = hideMenu;
  });
}

document.querySelector("#see-rates-btn").addEventListener("click", () => {
  $ratesFormContainer.classList.add("show-to-left");
  $overlay.classList.remove("occult");
  validateDate();
  closeMenu();
});

document.querySelector("#convert-btn").addEventListener("click", () => {
  $convertForm.classList.add("show-to-left");
  $overlay.classList.remove("occult");
  closeMenu();
});

document.querySelector("#show").addEventListener("click", () => {
  showRates();
  $formRates.classList.add("occult");
  $ratesFormContainer.classList.add("move-to-top");
  $closeButton.classList.add("move-img");
  $backButton.classList.remove("occult");
  $backButton.classList.add("move-img");
  event.preventDefault();
});

$backButton.addEventListener("click", () => {
  removeTableRates();
});

document.querySelector("#convert").addEventListener("click", () => {
  showConvertedCurrencies();
  event.preventDefault();
});