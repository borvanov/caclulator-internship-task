class CalculatorDrawer {
  /**
   * 
   * @param {string} title 
   * @param {Function} onClick 
   * @returns {void}
   */
  appendButton(title, onClick) {
    throw new Error("Render function for Button is not implemented");
  }

  /**
   * @returns {void}
   */
  renderLayout() {
    throw new Error("Render function for Layout is not implemented");
  }

  /**
   * 
   * @param {string} value 
   * @returns {void}
   */
  setInputValue(value) {
    throw new Error("Render function for Input value is not implemented");
  }
}

export default CalculatorDrawer;
