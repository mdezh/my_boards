import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="use-state"
export default class UseStateController extends Controller {
  static values = {
    use: { type: Array, default: [] },
  };

  initialize() {
    if (this.useValue.length == 0) {
      throw Error(`State dependencies are not defined`);
    }
    this.state = {};
    this._addActions();
  }

  connect() {
    this._requestState();
  }

  refresh(e) {
    if (e.detail == null || e.detail.value == null || e.detail.name == null)
      return;

    this.state = Object.assign(this.state, { [e.detail.name]: e.detail.value });
    this._handleStateChange();
  }

  _addActions() {
    const actions = this.useValue.map(
      (id) =>
        `${id}@window->${this.identifier}#refresh ${id}_to_${this.element.id}@window->${this.identifier}#refresh`
    );

    this.element.dataset.action = [this.element.dataset.action, ...actions]
      .join(" ")
      .trim();
  }

  _requestState() {
    this.useValue.forEach((id) => fire(`fire_${id}`, this.element.id));
  }

  _handleStateChange() {
    if (Object.keys(this.state).length < this.useValue.length) return;

    this._updateWithState();
  }

  _updateWithState() {
    throw Error("Not implemented");
  }
}
