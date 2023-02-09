import UseStateController from "controllers/use_state_controller";
import { promoteToFrameVisit } from "helpers";
import { fire } from "helpers";

// Connects to data-controller="load-notes"
export default class extends UseStateController {
  _updateWithState() {
    // next line prevents unnecessary request after first load
    if (this.prevBoardId != undefined) {
      if (this.prevBoardId != this.state.id) {
        promoteToFrameVisit("notes_frame", this.state.path, "replace");
      } else {
        fire("set_panel_state", {
          active_panel: "notes",
        });
      }
    }
    this.prevBoardId = this.state.id;
  }
}
