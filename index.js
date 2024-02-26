const fs = require("fs");

function generateExpression() {
  let expression = "";
  for (let number = 9; number >= 0; number--) {
    expression += number;
    if (number > 0) {
      expression += generateOperator();
    }
  }
  return expression;
}

function generateOperator() {
  const operators = ["+", "-", ""];
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

function evaluateExpression(expression) {
  return eval(expression);
}

function saveResultToFile(result) {
  fs.writeFileSync("results.txt", result + "\n", { flag: "a" });
}

function isUniqueResult(result) {
  try {
    const data = fs.readFileSync("results.txt", "utf8");
    const results = data.split("\n");
    return !results.includes(result);
  } catch (err) {
    console.error(err);
    return true;
  }
}

let target = 200;
const loops = 100000;
let found = false;
let resultExpression = "";

for (i = 0; i < loops && !found; i++) {
  let expression = generateExpression();
  let result = evaluateExpression(expression);
  if (result === target && isUniqueResult(expression)) {
    found = true;
    resultExpression = expression;
    saveResultToFile(resultExpression);
  }
}

if (found) {
  console.log(resultExpression + "=" + target);
}

if (!found) {
  console.log("Больше нет вариаций");
}
