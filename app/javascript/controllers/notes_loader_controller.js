import UseStateController from "controllers/use_state_controller";
import { promoteToFrameVisit, fire } from "helpers";

// Connects to data-controller="notes-loader"
export default class extends UseStateController {
  initialize() {
    this.useValue = "active_board_state";
    super.initialize();
  }

  call(e) {
    const { id, path } = e.detail;
    if (this.state?.id != id) {
      promoteToFrameVisit("notes_frame", path, "advance");
      fire("set_active_board_state", { id });
    } else {
      fire("set_details_state", { show_details: false });
      document
        .querySelectorAll(".cancel-btn-details")
        .forEach((btn) => btn.click());
      id && fire("set_panel_state", { active_panel: "notes" });
    }
  }

  _getNewActions() {
    return [
      ...super._getNewActions(),
      `notes_loader@window->${this.identifier}#call`,
    ];
  }
}
