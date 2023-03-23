const requestApiURL = "https://api.exchangerate.host/";

function manageRatesData() {
  const $currencySelect = document.querySelector("#currency-select");
  let selectedDate = validateDate();
  let selectedBaseCurrency = getBaseCurrency($currencySelect.value);

  fetch(requestApiURL + selectedDate + selectedBaseCurrency)
    .then((response) => response.json())
    .then((data) => {
      showRates(data);
      console.log(data.rates);
    })
    .catch((error) => console.error("Failed", error));
}

function showRates(data) {
  let $tableCurrency = document.querySelector("table");
  let $titleRatesTable = document.querySelector("caption");
  $titleRatesTable.textContent = `Exchange rates for "${data.base}" in date: ${data.date}`;
  Object.keys(data.rates).forEach((currency) => {
    let currencyTableRow = document.createElement("tr");
    currencyTableRow.classList.add("currency-row");
    let currencyCell = document.createElement("td");
    let valueCell = document.createElement("td");
    currencyCell.textContent = currency;
    valueCell.textContent = data.rates[currency];
    currencyTableRow.append(currencyCell, valueCell); 
    $tableCurrency.append(currencyTableRow);
    $tableCurrency.style.display = "block";
  });
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
  let resultText = document.querySelector("h2");
  resultText.textContent = `${data.result} ${data.query.to}`;
}

function getCurrencysToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

function getAmount(amount) {
  return `&amount=${amount}`;
}

document.querySelector("#show").onclick = () => {
  manageRatesData();
  event.preventDefault();
};

document.querySelector("#remove").onclick = () => {
  location.reload();
  event.preventDefault();
};

document.querySelector("#convert").onclick = () => {
  manageConvertCurrenciesData();
  event.preventDefault();
};
