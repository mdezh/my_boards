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
    this.statesInUse = new Set();
    this._addActions();
  }

  connect() {
    this._requestState();
  }

  refresh(e) {
    if (e.detail == null) return;

    const { name, value } = e.detail;
    if (value == null || name == null) return;

    this.statesInUse.add(name);
    this.state = Object.assign(
      this.state,
      typeof value == "object" ? value : { [name]: value }
    );
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
    if (this.statesInUse.size < this.useValue.length) return;

    this._updateWithState();
  }

  _updateWithState() {
    throw Error("Not implemented");
  }
}
