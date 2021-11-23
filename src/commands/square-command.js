import BaseCommand from "./base-command";

class SquareCommand extends BaseCommand {
  execute() {
    return this.leftOperand * this.leftOperand;
  }
}

export default SquareCommand;
