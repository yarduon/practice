import QrScanner from "./qr-scanner.min.js";

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

  showSolutions(
    document.getElementById("operator").value,
    +document.getElementById("number").value
  );
}

function showSolutions(operator, number) {
  document.getElementById("solutions").innerHTML = "";
  let result = 0;
  for (let i = 0; i < 11; i++) {
    switch (operator) {
      case "+":
        result = number + i;
        break;
      case "-":
        result = number - i;
        break;
      default:
        result = number * i;
        break;
    }
    document.getElementById("solutions").innerHTML +=
      number + "" + operator + "" + i + " = " + result + "<br>";
  }
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
  if (document.getElementById("answer").value == result) {
    calculate(
      document.getElementById("operator").value,
      +document.getElementById("number").value
    );
    document.getElementById("error").innerHTML = "";
  } else {
    document.getElementById("error").innerHTML = "Incorrect answer!";
  }
  document.getElementById("answer").value = "";
});

let qrScanner = "";
document.getElementById("start").addEventListener("click", () => {
 
  // Crear escaner
  qrScanner = new QrScanner(
    document.getElementById("reader"),
    (result) => (document.getElementById("result").innerHTML = result.data),
    {
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  );
  qrScanner.setCamera("environment");
  qrScanner
    .start()
    .then(() => {
      QrScanner.listCameras(true).then((cameras) =>
        cameras.forEach((camera) => {
          console.log(camera);
        })
      );
    })
    .catch(() => {
      qrScanner.destroy();
      console.log("No hay camara");
    });
});

document.getElementById("stop").addEventListener("click", () => {
  qrScanner.stop();
  document.getElementsByClassName("scan-region-highlight")[0].remove();
});
