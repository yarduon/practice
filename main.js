let result = 0;

function calculate(operator, number) {
  let secondNumber = Math.round(Math.random() * 10);
  switch (operator) {
    case "+":
      result = number + secondNumber;
      break;
    case "-":
      result = number - secondNumber;
      break;
    default:
      result = number * secondNumber;
      break;
  }
  document.getElementById("operation").innerHTML =
    number + "" + operator + "" + secondNumber;
}

for (let i = 9; i > 0; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  document.getElementById("number").appendChild(option);
}

Array.from(document.getElementsByClassName("selector")).forEach((e) => {
    calculate(
        document.getElementById("operator").value,
        +document.getElementById("number").value
      );
  e.addEventListener("change", () => {
    calculate(
      document.getElementById("operator").value,
      +document.getElementById("number").value
    );
  });
});

document.getElementById("confirm-answer").addEventListener("click", () => {
    console.log(result);
    if(document.getElementById("answer").value == result){
        calculate(
            document.getElementById("operator").value,
            +document.getElementById("number").value
          );
        document.getElementById("error").innerHTML = "";
    } else {
        document.getElementById("error").innerHTML = "Incorrect answer!"
    }
})