import BaseCommand from "./base-command";

class FactorialCommand extends BaseCommand {
  execute() {
    if (this.leftOperand < 0) {
      throw new Error("Factorial can not be taken from negative value");
    }

    if (this.leftOperand === 0) {
      return 0;
    }

    return new Array(this.leftOperand)
      .fill(0)
      .map((item, index) => index + 1)
      .reduce((accumulator, currentItem) => accumulator * currentItem, 1);
  }
}

export default FactorialCommand;
