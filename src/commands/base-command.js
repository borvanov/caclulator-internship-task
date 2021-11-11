class BaseCommand {
  leftOperand;
  rightOperand;

  constructor(leftOperand, rightOperand) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }

  execute() {
    throw new Error("Execute method is not implemented yet");
  }
}

export default BaseCommand;
