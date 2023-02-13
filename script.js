class Calculator {
	constructor(previousOperantText, currentOperantText) {
		this.previousOperantText = previousOperantText;
		this.currentOperantText = currentOperantText;
		this.clear();
	}

	clear() {
		this.currentOperant = "";
		this.previousOperant = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperant = this.currentOperant.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperant.includes(".")) return;
		this.currentOperant = this.currentOperant.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperant === "") return;
		if (this.previousOperant !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperant = this.currentOperant;
		this.currentOperant = "";
	}
	compute() {
		let computation;
		const prev = parseFloat(this.previousOperant);
		const current = parseFloat(this.currentOperant);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperant = computation;
		this.operation = undefined;
		this.previousOperant = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];

		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentOperantText.innerText = this.getDisplayNumber(
			this.currentOperant
		);
		if (this.operation != null) {
			this.previousOperantText.innerText = `${this.getDisplayNumber(
				this.previousOperant
			)} ${this.operation}`;
		} else {
			this.previousOperantText.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-allClear]`);
const previousOperantText = document.querySelector(`[data-previousOperant]`);
const currentOperantText = document.querySelector(`[data-currentOperant]`);

const calculator = new Calculator(previousOperantText, currentOperantText);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay;
});
allClearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay;
});
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay;
});
