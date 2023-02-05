import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="active"
export default class extends Controller {
  static values = {
    active: { type: String, default: "" },
    frame: String,
    path: String,
  };
  static targets = ["item", "inner"];
  static classes = ["selected"];

  itemTargetDisconnected(e) {
    if (
      e?.id == this.activeValue &&
      document.querySelectorAll(`#${e.id}`).length == 0 // to prevent issues when element is duplicated by broadcasting
    ) {
      this.activeValue = "";
      const turboFrame = document.querySelector(`#${this.frameValue}`);
      if (turboFrame) {
        this.promoteToFrameVisit(turboFrame, this.pathValue, "replace");
      }
    }
  }

  innerTargetConnected(e) {
    const id = e.dataset.id;
    if (id == this.activeValue) {
      const item = document.querySelector(`#${id}`);
      item?.classList.add(...this.selectedClasses);
    }
  }

  activeValueChanged(next, prev) {
    if (prev) {
      const prevItem = document.querySelector(`#${prev}`);
      prevItem?.classList.remove(...this.selectedClasses);
    }
    if (next) {
      const nextItem = document.querySelector(`#${next}`);
      nextItem?.classList.add(...this.selectedClasses);
    }
  }

  // use this to guarantee right navigation action (advance or replace)
  promoteToFrameVisit(
    element /*: FrameElement */,
    src /*: string */,
    action = null
  ) {
    const link = document.createElement("a");
    link.setAttribute("href", src);
    if (action) {
      link.setAttribute("data-turbo-action", action); // you can skip this is the <turbo-frame> already declares [data-turbo-action]
    }
    link.setAttribute("hidden", "");
    element.appendChild(link);
    link.click();
    element.removeChild(link);
  }
}
