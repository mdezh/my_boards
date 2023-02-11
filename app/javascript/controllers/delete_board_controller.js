import UseStateController from "controllers/use_state_controller";
import { fire, promoteToFrameVisit } from "helpers";

// Connects to data-controller="delete-board"
export default class extends UseStateController {
  disconnect() {
    const id = this.element.id.split("_").slice(-1);
    if (
      id == this.state.id &&
      !document.getElementById(this.element.id) // to prevent issue when element is duplicated by broadcasting
    ) {
      promoteToFrameVisit("notes_frame", "/", "advance");
      fire("set_active_board_state", {
        id: "0",
      });
    }
  }

  _updateWithState(_state) { }
}
