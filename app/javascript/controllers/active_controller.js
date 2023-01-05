import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="active"
export default class extends Controller {
  static values = {
    active: { type: String, default: "" },
    frame: String,
    path: String,
  };
  static targets = ["item"];
  static classes = ["selected"];

  itemTargetDisconnected(e) {
    if (e?.id == this.activeValue) {
      const turboFrame = document.querySelector(`#${this.frameValue}`);
      if (turboFrame) {
        turboFrame.src = this.pathValue;
      }
    }
  }

  activeValueChanged(next, prev) {
    if (prev) {
      const prevItem = document.querySelector(`#${prev}`);
      prevItem?.classList.remove(this.selectedClass);
    }
    if (next) {
      const nextItem = document.querySelector(`#${next}`);
      nextItem?.classList.add(this.selectedClass);
    }
  }
}
