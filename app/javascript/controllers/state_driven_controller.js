import { UseStateController } from "../base_classes/use_state_controller";

// Connects to data-controller="state-driven"
export default class extends UseStateController {
  static values = {
    ...super.values,
    key: String,
  };

  updateWithState() {
    if (this.state[this.keyValue]) {
      this.element.classList.remove(this.hiddenClassValue);
    } else {
      this.element.classList.add(this.hiddenClassValue);
    }
  }
}
