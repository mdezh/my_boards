import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="count-me"
export default class extends Controller {
  static values = {
    counter: String,
  };

  initialize() {
    this._addActions();
  }

  connect() {
    this.fireInc();
  }

  fireInc() {
    fire(`inc_${this.counterValue}`);
  }

  disconnect() {
    fire(`dec_${this.counterValue}`);
  }

  _addActions() {
    this.element.dataset.action = [
      this.element.dataset.action,
      `${this.counterValue}_count@window->${this.identifier}#fireInc`,
    ]
      .join(" ")
      .trim();
  }
}
