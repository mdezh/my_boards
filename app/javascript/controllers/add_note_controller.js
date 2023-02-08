import UseStateToToggleController from "controllers/use_state_to_toggle_controller";

// Connects to data-controller="add-note"
export default class extends UseStateToToggleController {
  checkFunction() {
    return this.state.owned || (this.state.joined && this.state.public_rw);
  }
}
