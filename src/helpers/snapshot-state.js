class SnapshotState {
  statesCollection;

  /**
   *
   * @param {number*} size
   */
  constructor(size) {
    if (size < 1) {
      throw new Error("States storage size can not be less than 1");
    }

    this.statesCollection = new Array(size);
  }

  /**
   *
   * @returns {any}
   */
  popState() {
    this.statesCollection.pop();
    return this.statesCollection.pop();
  }

  /**
   *
   * @param {any} state
   */
  pushState(state) {
    this.statesCollection.push(state);
  }
}

export default SnapshotState;
