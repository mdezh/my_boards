import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="event"
export default class extends Controller {
  static values = {
    payload: Object,
    onConnect: { type: Boolean, default: false },
    onDisconnect: { type: Boolean, default: false },
    confirm: String,
  };

  initialize() {
    if (!this.hasPayloadValue) {
      throw Error("Event payload not defined");
    }
  }

  connect() {
    if (this.onConnectValue) {
      // a race condition is possible here if the listener is not connected yet
      this._fire();
      // next line prevents repeating fire after bw/fw navigation
      this.onConnectValue = false;
    }
  }

  disconnect() {
    if (this.onDisconnectValue) {
      this._fire();
      // next line prevents repeating fire after bw/fw navigation
      this.onDisconnectValue = false;
    }
  }

  fire(e) {
    if (this.hasConfirmValue) {
      if (!confirm(this.confirmValue)) {
        e.preventDefault();
        return;
      }
    }

    this._fire();
  }

  _fire() {
    Object.keys(this.payloadValue).forEach((key) =>
      fire(key, this.payloadValue[key])
    );
  }
}
