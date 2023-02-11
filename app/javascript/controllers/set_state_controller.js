import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="set-state"
export default class extends Controller {
  static values = {
    change: Object,
    onConnect: { type: Boolean, default: false },
  };

  connect() {
    if (this.onConnectValue) {
      // here will be a race condition if the state storage is created by the same render
      // so state should already exists on the page
      this.fire();
      // next line prevents repeating fire after bw/fw navigation
      this.onConnectValue = false;
    }
  }

  fire() {
    Object.keys(this.changeValue).forEach((key) => {
      fire(`set_${key}`, this.changeValue[key]);
    });
  }
}
