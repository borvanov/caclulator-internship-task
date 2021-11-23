import AddCommand from "./add-command";
import MultiplyCommand from "./multiply-command";
import BaseCommand from "./base-command";
import FactorialCommand from "./factorial-command";
import SubtractCommand from "./subtract-command";
import DivideCommand from "./divide-command";
import SquareCommand from "./square-command";

class CommandsFactory {
  /**
   *
   * @param {string} sign
   * @returns {BaseCommand}
   */
  getCommandBySign(sign) {
    switch (sign) {
      case "+":
        return AddCommand;
      case "-":
        return SubtractCommand;
      case "*":
        return MultiplyCommand;
      case "!":
        return FactorialCommand;
      case "/":
        return DivideCommand;
      case "x^2":
        return SquareCommand;

      default:
        throw new Error("Command for the provided sign not found");
    }
  }
}

export default CommandsFactory;
