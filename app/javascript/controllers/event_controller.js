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
    this.onConnectValue && this._fire();
  }

  disconnect() {
    this.onDisconnectValue && this._fire();
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
