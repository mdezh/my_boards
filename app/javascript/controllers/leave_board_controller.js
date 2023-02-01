import { UseStateController } from "../base_classes/use_state_controller";

// Connects to data-controller="leave-board"
export default class extends UseStateController {
  updateWithState(state) {
    if (state.joined) {
      this.element.classList.remove(this.hiddenClassValue);
    } else {
      this.element.classList.add(this.hiddenClassValue);
    }
  }
}
