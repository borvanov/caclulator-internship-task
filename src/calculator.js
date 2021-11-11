import CommandsFactory from "./commands";
import Subject from "./helpers/subject";

const initialCalculatorState = {
  leftOperand: 0,
  rightOperand: 0,
  operation: undefined,
  error: undefined,
};

class Calculator {
  availableCalculateOperations = ["*", "/", "+", "-", "="];
  availableModifyOperations = ["x^2", "!"];

  state = new Subject(initialCalculatorState);

  /**
   *
   * @param {string} operation
   * @returns {boolean}
   */
  static isEqualOperation(operation) {
    return operation === "=";
  }

  /**
   *
   * @param {string} operation
   * @returns {void}
   */
  processCalculateOperation = (operation) => {
    const {
      operation: currentOperation,
      leftOperand,
      rightOperand,
      error,
    } = this.state.getValue();

    if (error) {
      return;
    }

    if (!currentOperation || Calculator.isEqualOperation(currentOperation)) {
      this.changeState({ operation });
    } else {
      try {
        const Command = new CommandsFactory().getCommandBySign(
          currentOperation
        );
        this.changeState({
          leftOperand: new Command(leftOperand, rightOperand).execute(),
          rightOperand: 0,
          operation: Calculator.isEqualOperation(operation)
            ? undefined
            : operation,
        });
      } catch (error) {
        this.catchError(error.message);
      }
    }
  };

  /**
   *
   * @param {string} operation
   * @returns {void}
   */
  processModifyOperation = (operation) => {
    const {
      leftOperand,
      rightOperand,
      operation: currentOperation,
      error,
    } = this.state.getValue();

    if (error) {
      return;
    }

    const Command = new CommandsFactory().getCommandBySign(operation);
    try {
      const newValue = new Command(
        currentOperation ? rightOperand : leftOperand
      ).execute();
      this.changeCurrentValue(newValue);
    } catch (error) {
      this.catchError(error.message);
    }
  };

  /**
   *
   * @param {number} value
   * @returns {void}
   */
  processNumber = (value) => {
    const { error } = this.state.getValue();

    if (error) {
      return;
    }

    const newValue = Number(`${this.getActiveValue()}${value}`);
    this.changeCurrentValue(newValue);
  };

  /**
   *
   * @param {object} newState
   * @returns {void}
   */
  changeState = (newState) => {
    this.state.next({
      ...this.state.getValue(),
      ...newState,
    });
  };

  /**
   * Process backspace functionality
   * @returns {void}
   */
  processBackspace = () => {
    const { error } = this.state.getValue();

    if (error) {
      return;
    }

    const currentValueString = `${this.getActiveValue()}`;
    const newValue = Number(
      currentValueString.substr(0, currentValueString.length - 1)
    );
    this.changeCurrentValue(newValue);
  };

  /**
   * Clears all the states
   * @returns {void}
   */
  clear = () => {
    this.changeState(initialCalculatorState);
  };

  /**
   *
   * @returns {number}
   */
  getActiveValue = () => {
    const { operation, leftOperand, rightOperand } = this.state.getValue();
    return operation ? rightOperand : leftOperand;
  };

  /**
   *
   * @param {number} newValue
   */
  changeCurrentValue = (newValue) => {
    const { operation } = this.state.getValue();
    this.changeState(
      operation ? { rightOperand: newValue } : { leftOperand: newValue }
    );
  };

  /**
   * @param {string} errorMessage
   * @returns {void}
   */
  catchError = (errorMessage) => {
    this.changeState({ error: errorMessage });
  };
}

export default Calculator;
