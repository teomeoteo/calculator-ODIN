// Calculator state
let calculator = {
  operandA: '',
  operandB: '',
  operator: null,
  resultDisplayed: false
};

// Display
const display = document.getElementById('display');

// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error: Div by 0' : a / b; }

// Operate function
function operate(operator, a, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return b;
  }
}

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle number buttons
document.querySelectorAll('.number').forEach(btn => {
  btn.addEventListener('click', () => {
    if (calculator.resultDisplayed) {
      calculator.operandA = '';
      calculator.resultDisplayed = false;
    }
    if (!calculator.operator) {
      calculator.operandA += btn.textContent;
      updateDisplay(calculator.operandA);
    } else {
      calculator.operandB += btn.textContent;
      updateDisplay(calculator.operandB);
    }
  });
});

// Handle decimal
document.querySelector('.decimal').addEventListener('click', () => {
  let target = !calculator.operator ? 'operandA' : 'operandB';
  if (!calculator[target].includes('.')) {
    calculator[target] += calculator[target] ? '.' : '0.';
    updateDisplay(calculator[target]);
  }
});

// Handle operators
document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', () => {
    if (calculator.operandA && calculator.operandB) {
      let result = operate(calculator.operator, Number(calculator.operandA), Number(calculator.operandB));
      result = typeof result === 'number' ? +result.toFixed(5) : result;
      updateDisplay(result);
      calculator.operandA = result.toString();
      calculator.operandB = '';
    }
    calculator.operator = btn.textContent;
  });
});

// Handle equal
document.querySelector('.equal').addEventListener('click', () => {
  if (calculator.operandA && calculator.operator && calculator.operandB) {
    let result = operate(calculator.operator, Number(calculator.operandA), Number(calculator.operandB));
    result = typeof result === 'number' ? +result.toFixed(5) : result;
    updateDisplay(result);
    calculator.operandA = result.toString();
    calculator.operandB = '';
    calculator.operator = null;
    calculator.resultDisplayed = true;
  }
});

// Clear button
document.querySelector('.clear').addEventListener('click', () => {
  calculator = { operandA: '', operandB: '', operator: null, resultDisplayed: false };
  updateDisplay('0');
});

// Backspace
document.querySelector('.backspace').addEventListener('click', () => {
  if (!calculator.operator) {
    calculator.operandA = calculator.operandA.slice(0, -1);
    updateDisplay(calculator.operandA || '0');
  } else {
    calculator.operandB = calculator.operandB.slice(0, -1);
    updateDisplay(calculator.operandB || '0');
  }
});