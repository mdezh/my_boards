import UseStateBaseController from "../base_classes/use_state_base_controller";

// Connects to data-controller="select-board"
export default class extends UseStateBaseController {
  updateWithState() {
    // next line prevents unnecessary request after first load
    if (this.prevBoardId) {
      this.promoteToFrameVisit("notes_frame", this.state.path, "replace");
      if (this.state.id != "0") {
        window.dispatchEvent(
          new CustomEvent("set_panel_state", {
            detail: {
              active_panel: "notes",
            },
          })
        );
      }
    }
    this.prevBoardId = this.state.id;
  }

  // use this to guarantee right navigation action (advance or replace)
  promoteToFrameVisit(
    element /*: string || String || FrameElement */,
    src /*: string */,
    action = null
  ) {
    if (typeof element == "string" || element instanceof String) {
      element = document.getElementById(element);
    }

    if (!element) throw Error("Element not defined");

    const link = document.createElement("a");
    link.setAttribute("href", src);
    if (action) {
      link.setAttribute("data-turbo-action", action); // you can skip this if the <turbo-frame> already declares [data-turbo-action]
    }
    link.setAttribute("hidden", "");
    element.appendChild(link);
    link.click();
    element.removeChild(link);
  }
}
