const previousText = document.getElementById("previous-text");
const currentText = document.getElementById("current-text");
const operands = document.querySelectorAll("[data-operand]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const operators = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equals]");
let usedOperator = undefined;

equalButton.addEventListener("click", () => {
  handleClickEqualButton();
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    handleClickOperator(operator.innerText);
  });
});

deleteButton.addEventListener("click", () => {
  deleteSingleChar();
});

allClearButton.addEventListener("click", () => {
  allClear();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    enterOperand(operand.innerText);
  });
});

function enterOperand(number) {
  const stringNum = number.toString();
  if (stringNum === "." && currentText.innerText.includes(".")) return;
  currentText.innerText += stringNum;
}

function allClear() {
  currentText.innerText = "";
  previousText.innerText = "";
}

function deleteSingleChar() {
  currentText.innerText = currentText.innerText.slice(0, -1);
}

function handleClickOperator(operator) {
  if (currentText.innerText === "") return;
  if (operator != null) {
    previousText.innerText = `${currentText.innerText} ${operator}`;
  } else {
    previousText.innerText = currentText.innerText;
  }
  currentText.innerText = "";
  usedOperator = operator;
}

function handleClickEqualButton() {
  if (currentText.innerText === "" || previousText.innerText === "") return;
  calculation();
}

function calculation() {
  const prevValue = parseFloat(previousText.innerText);
  const currentValue = parseFloat(currentText.innerText);
  let result = 0;
  switch (usedOperator) {
    case "+":
      result = currentValue + prevValue;
      break;
    case "-":
      result = currentValue - prevValue;
      break;
    case "x":
      result = currentValue * prevValue;
      break;
    case "÷":
      result = currentValue / prevValue;
      break;
    default:
      return;
  }
  previousText.innerText = "";
  currentText.innerText = result;
  usedOperator = undefined;
}

// function getStandardDisplay(number) {
//   const stringNumber = number.toString();
//   const integerDigits = parseFloat(stringNumber.split(".")[0]);
//   const decimalDigit = stringNumber.split(".")[1];
//   let integerDisplay;
//   if (isNaN(integerDigits)) {
//     integerDisplay = "";
//   } else {
//     integerDisplay = integerDigits.toLocaleString("en", {
//       maximumFractionDigits: 0,
//     });
//   }
//   if (decimalDigit != null) {
//     return `${integerDigits}.${decimalDigit}`;
//   } else {
//     return integerDigits;
//   }
// }
