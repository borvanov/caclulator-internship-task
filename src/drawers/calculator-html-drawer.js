import CalculatorDrawer from "./calculator-drawer";

class CalculatorHtmlDrawer extends CalculatorDrawer {
  rootElement;
  input;
  buttonsWrapper;

  /**
   *
   * @param {string} rootElementId
   */
  constructor(rootElementId) {
    super();

    this.rootElement = document.getElementById(rootElementId);

    if (!this.rootElement) {
      throw new Error("Element with given ID not found");
    }
  }

  /**
   *
   * @param {string} title
   * @param {Function} onClick
   * @returns {void}
   */
  appendButton(title, onClick) {
    const button = this.renderButton(title, onClick);
    if (this.buttonsWrapper) {
      this.buttonsWrapper.appendChild(button);
    }
  }

  /**
   *
   * @param {string} title
   * @param {Function} onClick
   * @returns {HTMLElement}
   */
  renderButton(title, onClick) {
    const button = document.createElement("button");
    button.innerHTML = title;
    button.addEventListener("click", () => {
      onClick.call(undefined, title);
    });
    return button;
  }

  /**
   *
   * @param {string|number} initialValue
   * @returns {HTMLElement}
   */
  renderInput(initialValue) {
    const input = document.createElement("input");
    input.disabled = true;
    input.value = initialValue;
    return input;
  }

  /**
   * Renders calculator layout
   */
  renderLayout() {
    this.buttonsWrapper = document.createElement("div");
    this.input = this.renderInput(0);
    this.rootElement.appendChild(this.input);

    this.rootElement.appendChild(this.buttonsWrapper);
  }

  /**
   * @param {string|number} value
   * @returns {void}
   */
  setInputValue(value) {
    this.input.value = value;
  }
}

export default CalculatorHtmlDrawer;
