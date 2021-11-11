import BaseCommand from "./base-command";

class DivideCommand extends BaseCommand {
  execute() {
    if (!this.rightOperand) {
      throw new Error("Can not divide by 0");
    }
    return this.leftOperand / this.rightOperand;
  }
}

export default DivideCommand;
