const requestApiURL = "https://api.exchangerate.host/";
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

document.querySelector("#show").onclick = () => {
  let selectedDate = `${$inputSelectYear.value}-${$inputSelectMonth.value}-${$inputSelectDay.value}`;

  fetch(requestApiURL + selectedDate)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });

  event.preventDefault();
};
