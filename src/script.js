const requestApiURL = "https://api.exchangerate.host/";
const ratesForm = document.querySelector(".form-rates-section");
const convertForm = document.querySelector(".form-convert-section");
const $tableCurrency = document.querySelector("table");
const overlay = document.querySelector(".overlay");

function manageRatesData() {
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

function showRates(data) {
  const $titleRatesTable = document.querySelector("caption");
  $titleRatesTable.textContent = `Exchange rates for "${data.base}" in date: ${data.date}`;

  Object.keys(data.rates).forEach((currency) => {
    showTableData(data, currency);
  });

  $tableCurrency.classList.remove("occult");
  document.querySelector(".form-rates-section").classList.add("max-height");
}

function showTableData(data, currency) {
  let currenciesTableRow = document.createElement("tr");
  let flagCell = document.createElement("td");
  let currencyCell = document.createElement("td");
  let valueCell = document.createElement("td");
  let flagImage = document.createElement("img");
  flagImage.classList.add("flag");
  flagImage.src = getFlags(currency.slice(0, 2));
  currencyCell.textContent = `${currency}`;
  valueCell.textContent = Math.round(data.rates[currency] * 100) / 100;
  flagCell.append(flagImage);
  currenciesTableRow.append(flagCell, currencyCell, valueCell);
  $tableCurrency.append(currenciesTableRow);
}

function getFlags(currencyCode) {
  const flagURL =
    "https://flagsapi.com/";

  return `${flagURL}${currencyCode}/flat/64.png`;
}

function validateDate() {
  const $inputDate = document.querySelector("#date");
  const currentDate = new Date().toJSON().slice(0, 10);
  if ($inputDate.value === "") {
    return currentDate;
  } else {
    return $inputDate.value;
  }
}

function getBaseCurrency(currency) {
  return `?base=${currency}`;
}

function manageConvertCurrenciesData() {
  const $inputFromCurrency = document.querySelector("#from-currency");
  const $inputToCurrency = document.querySelector("#to-currency");
  const $inputAmount = document.querySelector("#amount");
  let selectedCurrenciesToConvert = getCurrencysToConvert(
    $inputFromCurrency.value,
    $inputToCurrency.value
  );
  let selectedAmount = getAmount($inputAmount.value);

  fetch(requestApiURL + selectedCurrenciesToConvert + selectedAmount)
    .then((response) => response.json())
    .then((data) => {
      showConvertResult(data);
    })
    .catch((error) => console.error("Failed", error));
}

function showConvertResult(data) {
  let resultText = document.querySelector(".result-convert");
  resultText.textContent = `${data.query.amount} ${data.query.from} = ${data.result} ${data.query.to}`;
}

function getCurrencysToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

function getAmount(amount) {
  return `&amount=${amount}`;
}

function closeMenu() {
  document.querySelectorAll(".close-menu-img").forEach((e) => {
    e.onclick = () => {
      ratesForm.classList.remove("show-to-left");
      convertForm.classList.remove("show-to-left");
      overlay.classList.add("occult");
    };
  });
}

document.querySelector("#see-rates-btn").onclick = () => {
  ratesForm.classList.add("show-to-left");
  overlay.classList.remove("occult");
  closeMenu();
};

document.querySelector("#convert-btn").onclick = () => {
  convertForm.classList.add("show-to-left");
  overlay.classList.remove("occult");
  closeMenu();
};

document.querySelector("#show").onclick = () => {
  manageRatesData();
  ratesForm.querySelector(".form-rates").classList.add("occult");
  document.querySelector(".form-rates-section").classList.add("move-to-top");
  ratesForm.querySelector(".close-menu-img").classList.add("move-img");
  event.preventDefault();
};

document.querySelector("#convert").onclick = () => {
  manageConvertCurrenciesData();
  event.preventDefault();
};
