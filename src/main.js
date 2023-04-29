/*
import {
  showRates,
  validateDate,
} from "./exchange.js";
*/

const requestApiURL = "https://api.exchangerate.host/";
const $ratesFormContainer = document.querySelector(".form-rates-section");
const $formRates = document.querySelector(".form-rates");
const $convertForm = document.querySelector(".form-convert-section");
const $tableCurrency = document.querySelector("#rates-table");
const $overlay = document.querySelector(".overlay");
const $backButton = document.querySelector(".back-menu-img");
const $closeButton = document.querySelector(".close-menu-img");


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

function getFlags(currencyCode) {
  const flagURL = "https://flagsapi.com/";

  return `${flagURL}${currencyCode}/flat/64.png`;
}

function showTableRates(data, currency) {
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

function showRates(data) {
  const $titleRatesTable = document.querySelector("caption");
  $titleRatesTable.textContent = `Exchange rates for "${data.base}" in date: ${data.date}`;

  Object.keys(data.rates).forEach((currency) => {
    showTableRates(data, currency);
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

function getBaseCurrency(currency) {
  return `?base=${currency}`;
}

function getRatesData() {
  const $currencySelect = document.querySelector("#currency-select");
  let selectedDate = validateDate();
  let selectedBaseCurrency = getBaseCurrency($currencySelect.value);

  fetch(requestApiURL + selectedDate + selectedBaseCurrency)
    .then((response) => response.json())
    .then((data) => {
      showRates(data);
    })
    .catch((error) => console.error("Failed", error));
}

function getCurrencysToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

function getAmount(amount) {
  return `&amount=${amount}`;
}

function showConvertResult(data) {
  const resultText = document.querySelector(".result-convert");
  resultText.textContent = `${data.query.amount} ${data.query.from} = 
  ${Math.round(data.result * 100) / 100} ${data.query.to}`;
  resultText.classList.add("visible");
}

function getConvertData(currencies, amount) {
  return fetch(requestApiURL + currencies + amount)
    .then((response) => response.json());
}

function getConvertCurrenciesData() {
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
  getRatesData();
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
  getConvertCurrenciesData();
  event.preventDefault();
});