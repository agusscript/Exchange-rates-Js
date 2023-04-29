export const requestApiURL = "https://api.exchangerate.host/";

export function validateDate() {
  const $inputDate = document.querySelector("#date");
  const currentDate = new Date().toJSON().slice(0, 10);
  $inputDate.setAttribute("max", currentDate);
  if ($inputDate.value === "") {
    return currentDate;
  } else {
    return $inputDate.value;
  }
}

export function getBaseCurrency(currency) {
  return `?base=${currency}`;
}

export function getRates(date, base) {
  return fetch(requestApiURL + date + base)
    .then((response) => response.json());
}

export function getCurrencysToConvert(currency1, currency2) {
  return `convert?from=${currency1}&to=${currency2}`;
}

export function getAmount(amount) {
  return `&amount=${amount}`;
}

export function getConvertData(currencies, amount) {
  return fetch(requestApiURL + currencies + amount)
    .then((response) => response.json());
}

export function getFlags(currencyCode) {
  const flagURL = "https://flagsapi.com/";

  return `${flagURL}${currencyCode}/flat/64.png`;
}