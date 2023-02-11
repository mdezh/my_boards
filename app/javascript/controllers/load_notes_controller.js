import UseStateController from "controllers/use_state_controller";
import { promoteToFrameVisit, fire } from "helpers";

// Connects to data-controller="load-notes"
export default class extends UseStateController {
  static values = {
    ...super.values,
    path: String,
    id: Number,
  };

  load() {
    if (this.state?.id != this.idValue) {
      promoteToFrameVisit("notes_frame", this.pathValue, "advance");
      fire("set_active_board_state", { id: this.idValue });
    } else {
      fire("set_panel_state", { active_panel: "notes" });
    }
  }
  _updateWithState(_state) { }
}
