import CalculatorDrawer from "./drawers/calculator-drawer";
import CalculatorHtmlDrawer from "./drawers/calculator-html-drawer";
import Calculator from "./calculator";
import SnapshotState from "./helpers/snapshot-state";

/**
 * Main class
 */
class CalculatorApp {
  drawer;
  calculator;
  snapshotState;

  /**
   *
   * @param {CalculatorDrawer} drawer
   * @param {Calculator} calculator
   */
  constructor(drawer, calculator) {
    this.drawer = drawer;
    this.calculator = calculator;
    this.snapshotState = new SnapshotState();
  }

  /**
   * Start method. Should be executed only one time
   */
  start() {
    // Render all the buttons
    this.drawer.renderLayout();

    this.calculator.availableCalculateOperations.forEach((operation) => {
      this.drawer.appendButton(operation, () => {
        this.calculator.processCalculateOperation(operation);
        this.snapshotState.pushState(this.calculator.state.getValue());
      });
    });

    this.calculator.availableModifyOperations.forEach((operation) => {
      this.drawer.appendButton(
        operation,
        this.calculator.processModifyOperation
      );
    });

    this.drawer.appendButton("C", this.calculator.processBackspace);
    this.drawer.appendButton("AC", this.calculator.clear);
    this.drawer.appendButton("Undo", () => {
      const lastState = this.snapshotState.popState();
      if (lastState) {
        this.calculator.changeState(lastState);
      } else {
        this.calculator.clear();
      }
    });

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((number) => {
      this.drawer.appendButton(number, this.calculator.processNumber);
    });

    // Rerender on calculator state change
    this.calculator.state.subscribe((state) => {
      const { error, rightOperand, leftOperand, operation } = state;
      if (error) {
        this.drawer.setInputValue(error);
        console.error(error);
        return;
      }

      // TODO: remove rightOperand > 0 and change it with render flag
      this.drawer.setInputValue(
        operation && rightOperand > 0 ? rightOperand : leftOperand
      );
    });
  }
}

new CalculatorApp(new CalculatorHtmlDrawer("root"), new Calculator()).start();
