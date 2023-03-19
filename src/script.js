const $inputSelectYear = document.querySelector("#year");
const $inputSelectMonth = document.querySelector("#month");
const $inputSelectDay = document.querySelector("#day");
const currentDate = new Date().toJSON().slice(0, 10);
const currenttYear = currentDate.slice(0, 4);

function getOptionsDate(min, max, select) {
  for (let i = max; i >= min; i--) {
    let newOption = document.createElement("option");
    select.append(newOption);
    newOption.textContent = i;
    newOption.value = i;

    if (newOption.textContent.length === 1) {
      newOption.textContent = `0${i}`;
      newOption.value = `0${i}`;
    }
  }
}

getOptionsDate(2000, currenttYear, $inputSelectYear);
getOptionsDate(1, 12, $inputSelectMonth);
getOptionsDate(1, 31, $inputSelectDay);

function getBaseCurrency(currency) {
  return `?base=${currency}`;
}

async function getApiData(request1, request2) {
  const requestApiURL = "https://api.exchangerate.host/";
  const response = await fetch(requestApiURL + request1 + request2);
  const data = await response.json();

  console.log(data);
}

document.querySelector("#show").onclick = () => {
  const $currencySelect = document.querySelector("#currency-select");
  let selectedDate = `${$inputSelectYear.value}-${$inputSelectMonth.value}-${$inputSelectDay.value}`;
  let selectedBaseCurrency = getBaseCurrency($currencySelect.value);

  console.log(getApiData(selectedDate, selectedBaseCurrency));

  event.preventDefault();
};

function getCurrencysToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

function getAmount(amount) {
  return `&amount=${amount}`;
}

document.querySelector("#convert").onclick = () => {
  const $inputFromCurrency = document.querySelector("#from-currency");
  const $inputToCurrency = document.querySelector("#to-currency");
  const $inputAmount = document.querySelector("#amount");
  let selectedCurrenciesToConvert = getCurrencysToConvert(
    $inputFromCurrency.value,
    $inputToCurrency.value
  );
  let selectedAmount = getAmount($inputAmount.value);

  getApiData(selectedCurrenciesToConvert, selectedAmount);

  event.preventDefault();
};
