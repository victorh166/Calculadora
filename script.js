// Obtiene referencias a los elementos del DOM
var calculator = document.getElementById("calculator");
var display = document.getElementById("display");

// Variables para manejar los operandos, operador y estado de igual presionado
var displayValue = "0";
var firstOperand = null;
var secondOperand = null;
var operator = null;
var equalPressed = false;

// Función que maneja el evento de clic en los botones de la calculadora
function handleClick(event) {
  // Obtiene el valor del botón presionado
  var buttonValue = event.target.textContent;

  // Lógica para números
  if (!isNaN(buttonValue)) {
    if (displayValue === "0" || equalPressed) {
      displayValue = buttonValue;
      equalPressed = false;
    } else {
      displayValue += buttonValue;
    }
  }

  // Lógica para punto decimal
  if (buttonValue === ".") {
    if (displayValue.indexOf(".") === -1) {
      displayValue += ".";
    }
  }

  // Lógica para operadores
  if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
    if (firstOperand === null) {
      firstOperand = parseFloat(displayValue);
    } else {
      // Si hay un primer operando, realiza la operación pendiente
      secondOperand = parseFloat(displayValue);
      performOperation();
    }

    // Asigna el operador y reinicia el display
    operator = buttonValue;
    displayValue = "0";
  }

  // Lógica para igual
  if (buttonValue === "=") {
    if (firstOperand !== null && operator !== null) {
      // Si hay un primer operando y un operador, realiza la operación pendiente
      secondOperand = parseFloat(displayValue);
      performOperation();
      equalPressed = true;
      // Reinicia las variables relacionadas con la operación
      firstOperand = null;
      operator = null;
    }
  }

  // Lógica para raíz cuadrada
  if (buttonValue === "√") {
    var number = parseFloat(displayValue);
    if (number < 0) {
      displayValue = "Error";
    } else {
      var root = Math.sqrt(number);
      displayValue = root.toFixed(2).toString();
    }
  }

  // Lógica para cambio de signo
  if (buttonValue === "+/-") {
    var negated = -parseFloat(displayValue);
    displayValue = negated.toString();
  }

  // Lógica para borrar
  if (buttonValue === "C") {
    displayValue = "0";
    // Reinicia las variables relacionadas con la operación
    firstOperand = null;
    secondOperand = null;
    operator = null;
  }

  // Actualiza el contenido del elemento display con el valor del display
  display.textContent = displayValue;
}

// Función que realiza la operación según el operador almacenado
function performOperation() {
  switch (operator) {
    case "+":
      displayValue = (firstOperand + secondOperand).toString();
      break;
    case "-":
      displayValue = (firstOperand - secondOperand).toString();
      break;
    case "*":
      displayValue = (firstOperand * secondOperand).toString();
      break;
    case "/":
      if (secondOperand === 0) {
        displayValue = "Error";
      } else {
        displayValue = (firstOperand / secondOperand).toFixed(2).toString();
      }
      break;
  }
}

// Añade un listener al elemento calculator para escuchar el evento de clic en los botones
calculator.addEventListener("click", handleClick);

