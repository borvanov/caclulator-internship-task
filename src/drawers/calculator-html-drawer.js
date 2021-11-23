import CalculatorDrawer from "./calculator-drawer";

class CalculatorHtmlDrawer extends CalculatorDrawer {
  rootElement;
  input;
  buttonsWrapper;
  buttonsSections;

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

    this.appendStyleToElement(document.body, {
      display: "flex",
      justifyContent: "center",
      margin: "50px 0",
    });
  }

  /**
   *
   * @param {string} title
   * @param {Function} onClick
   * @param {"calculate"|"general"|"number"} type
   * @returns {void}
   */
  appendButton(title, onClick, type = "number") {
    const button = this.renderButton(title, onClick);
    if (this.buttonsWrapper && this.buttonsSections[type]) {
      this.buttonsSections[type].appendChild(button);
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

    this.appendStyleToElement(button, {
      height: 40,
      width: 40,
      backgroundColor: "#f4f4f4",
      border: 0,
    });

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
    this.appendStyleToElement(input, {
      width: "100%",
      textAlign: "right",
      fontSize: 20,
      fontWeight: "bold",
    });
    return input;
  }

  /**
   * Renders calculator layout
   */
  renderLayout() {
    this.buttonsWrapper = document.createElement("div");
    this.appendStyleToElement(this.buttonsWrapper, {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
    });
    this.input = this.renderInput(0);

    const buttonsSection = document.createElement("div");
    this.appendStyleToElement(buttonsSection, {
      display: "flex",
      width: 120,
      flexWrap: "wrap",
      alignItems: "flex-start",
      margin: "0 20px",
    });

    this.buttonsSections = {
      calculate: buttonsSection.cloneNode(),
      general: buttonsSection.cloneNode(),
      number: buttonsSection.cloneNode(),
    };

    Object.entries(this.buttonsSections).forEach(([key, element]) => {
      this.buttonsWrapper.appendChild(element);
    });

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

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   * @returns {HTMLElement}
   */
  appendStyleToElement(element, style) {
    Object.entries(style).forEach(([key, value]) => {
      element.style[key] = value;
    });

    return element;
  }
}

export default CalculatorHtmlDrawer;
