function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNum = null;
let operator = null;
let secondNum = null;
let displayValue = null;

let display = document.querySelector('.value');
let operation = document.querySelector('.operation');
let buttons = document.querySelector('.buttons');
let numbers = buttons.querySelector('.numbers');
let operators = buttons.querySelector('.operators');

numbers.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        if (displayValue == null) {
            displayValue = event.target.id;
        } else {
            displayValue = displayValue + event.target.id;
        }
        updateValueDisplay();
    }
});

operators.addEventListener('click', (event) => {
    if (event.target.matches('button')) {
        if (['+', '-', 'x', '÷'].includes(event.target.id)) {
            firstNum = displayValue;
            secondNum = null;
            displayValue = null;
            operator = event.target.id;
        } else if (event.target.id == '=') {
            if (operator != null) {
                secondNum = displayValue;
                displayValue = operate(firstNum, operator, secondNum);
            } else {
                firstNum = displayValue;
            }
        } else if (event.target.id == 'c') {
            firstNum = null;
            operator = null;
            secondNum = null;
            displayValue = null;
        }
        updateValueDisplay();
        updateOperationDisplay();
    }
});

function operate(firstNum, operator, secondNum) {
    if (operator == '+') {
        return add(firstNum, secondNum);
    }
    if (operator == '-') {
        return subtract(firstNum, secondNum);
    }
    if (operator == 'x') {
        return multiply(firstNum, secondNum);
    }
    if (operator == '÷') {
        return divide(firstNum, secondNum);
    }
}

function updateValueDisplay() {
    display.textContent = displayValue;
}

function updateOperationDisplay() {
    if (firstNum != null) {
        if (operator != null) {
            if (secondNum != null) {
                operation.textContent = `${firstNum} ${operator} ${secondNum}`;
            } else {
                operation.textContent = `${firstNum} ${operator}`;
            }
        } else {
            operation.textContent = `${firstNum}`;
        }
    } else {
        operation.textContent = '';
    }
}
