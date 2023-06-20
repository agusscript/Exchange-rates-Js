import { getFlag } from "../api/flag-api.js";

export const $ratesFormContainer = document.querySelector(
  ".form-rates-section"
);
export const $formRates = document.querySelector(".form-rates");
export const $convertForm = document.querySelector(".form-convert-section");
const $tableCurrency = document.querySelector("#rates-table");
const $overlay = document.querySelector(".overlay");
export const $backButton = document.querySelector(".back-menu-img");
export const $closeButton = document.querySelector(".close-menu-img");

function createTableRates(data, currency) {
  const currenciesTableRow = document.createElement("tr");
  const flagCell = document.createElement("td");
  const currencyCell = document.createElement("td");
  const valueCell = document.createElement("td");
  const flagImage = document.createElement("img");

  flagImage.alt = `${currency} flag`;
  flagImage.classList.add("flag");
  flagImage.src = getFlag(currency.slice(0, 2));
  currencyCell.textContent = currency;
  valueCell.textContent = Math.round(data.rates[currency] * 100) / 100;

  currenciesTableRow.setAttribute("class", "table-row-currency");

  flagCell.appendChild(flagImage);
  currenciesTableRow.append(flagCell, currencyCell, valueCell);
  $tableCurrency.querySelector("tbody").appendChild(currenciesTableRow);
}

export function showTableRates(data) {
  const $titleRatesTable = document.querySelector("caption");
  $titleRatesTable.textContent = `Exchange rates for "${data.base}" in date: ${data.date}`;

  Object.keys(data.rates).forEach((currency) => {
    createTableRates(data, currency);
  });

  $tableCurrency.classList.remove("hidden");
  $ratesFormContainer.classList.add("max-height");
}

export function removeTableRates() {
  const $currencyTableRows = document.querySelectorAll(".table-row-currency");

  $ratesFormContainer.classList.remove("max-height");
  $ratesFormContainer.classList.remove("move-to-top");
  $formRates.classList.remove("hidden");
  $tableCurrency.classList.add("hidden");
  $closeButton.classList.remove("move-img");
  $backButton.classList.add("hidden");
  $currencyTableRows.forEach((row) => {
    row.remove();
  });
}

export function showConvertResult(data) {
  const resultText = document.querySelector(".result-convert");
  resultText.textContent = `${data.query.amount} ${data.query.from} = 
  ${Math.round(data.result * 100) / 100} ${data.query.to}`;
  resultText.classList.add("visible");
}

function hideMenu() {
  $ratesFormContainer.classList.remove("show-to-left");
  $convertForm.classList.remove("show-to-left");
  $overlay.classList.add("hidden");
}

export function showMenu(form) {
  form.classList.add("show-to-left");
  $overlay.classList.remove("hidden");
}

export function closeMenu() {
  $overlay.onclick = hideMenu;

  document.querySelectorAll(".close-menu-img").forEach((e) => {
    e.onclick = hideMenu;
  });
}

export function moveButtonToTop(button) {
  button.classList.add("move-img");
}

export function moveMenuToTop(menu) {
  menu.classList.add("move-to-top");
}

export function showElement(element) {
  element.classList.remove("hidden");
}

export function hideElement(element) {
  element.classList.add("hidden");
}
