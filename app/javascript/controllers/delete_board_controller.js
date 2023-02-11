import UseStateController from "controllers/use_state_controller";
import { fire, promoteToFrameVisit } from "helpers";

// Connects to data-controller="delete-board"
export default class extends UseStateController {
  initialize() {
    this.useValue = "active_board_state";
    super.initialize();
  }

  call(e) {
    const id = e.detail;
    if (id == this.state.id) {
      promoteToFrameVisit("notes_frame", "/", "advance");
      fire("set_active_board_state", {
        id: "0",
      });
    }
  }

  _getNewActions() {
    return [
      ...super._getNewActions(),
      `delete_board@window->${this.identifier}#call`,
    ];
  }
}
