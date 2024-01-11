class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    };
// clear function for the calculator
    clear () {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    }
// DEL aka "backspace" used to remove one character from the back of the array in the calculator
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) { // Switch case to add the working calculator functions
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        } if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// event listener for the number buttons including decimal button
numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

// event listener for the operation buttons (+, -, *, /)
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

// event listener for the "=" button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// event listener for the "AC" button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// event listener for the "DEL" buttons
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})