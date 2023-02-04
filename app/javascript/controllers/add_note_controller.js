import UseStateController from "../base_classes/use_state_controller";

// Connects to data-controller="add-note"
export default class extends UseStateController {
  checkFunction() {
    return this.state.owned || (this.state.joined && this.state.public_rw);
  }
}
