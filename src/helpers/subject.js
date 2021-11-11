class Subject {
  value;
  listeners = [];

  constructor(initialValue = undefined) {
    this.value = initialValue;
  }

  /**
   *
   * @param {Function} listener
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   *
   * @param {any} value
   */
  next(value) {
    this.value = value;
    this.listeners.forEach(function (listener) {
      listener.call(undefined, value);
    });
  }

  /**
   *
   * @returns {any}
   */
  getValue() {
    return this.value;
  }
}

export default Subject;
