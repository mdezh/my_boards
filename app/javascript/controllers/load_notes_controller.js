import UseStateController from "controllers/use_state_controller";
import { promoteToFrameVisit, fire } from "helpers";

// Connects to data-controller="load-notes"
export default class extends UseStateController {
  _updateWithState({ id, path }) {
    // next line prevents unnecessary request after first load
    if (this.prevId != null) {
      if (this.prevId != id) {
        promoteToFrameVisit("notes_frame", path, "replace");
      } else {
        fire("set_panel_state", {
          active_panel: "notes",
        });
      }
    }
    this.prevId = id;
  }
}
