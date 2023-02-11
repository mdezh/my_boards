import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="use-state"
export default class UseStateController extends Controller {
  static values = {
    use: String,
  };

  initialize() {
    if (!this.hasUseValue) {
      throw Error(`State dependencies are not defined`);
    }
    this.state = {};
    this.receivedStates = new Set();
    this._addActions();
  }

  connect() {
    this._requestState();
  }

  refresh(e) {
    if (e.detail == null) return;

    const { name, value } = e.detail;
    if (value == null || name == null) return;

    this.receivedStates.add(name);
    this.state = Object.assign(
      this.state,
      typeof value == "object" ? value : { [name]: value }
    );
    this._handleStateChange();
  }

  _addActions() {
    const dataset = this.element.dataset;

    if (dataset.actionsAdded?.includes(this.identifier)) return;

    dataset.actionsAdded = (
      (dataset.actionsAdded ?? "") + ` ${this.identifier}`
    ).trim();
    const actions = this.useValue
      .split(" ")
      .map(
        (id) =>
          `${id}@window->${this.identifier}#refresh ${id}_to_${this.element.id}@window->${this.identifier}#refresh`
      );

    dataset.action = [dataset.action, ...actions].join(" ").trim();
  }

  _requestState() {
    this.useValue
      .split(" ")
      .forEach((id) => fire(`fire_${id}`, this.element.id));
  }

  _handleStateChange() {
    if (this.receivedStates.size < this.useValue.split(" ").length) return;

    setTimeout(() => this._updateWithState(this.state), 0);
  }

  _updateWithState(_state) {
    throw Error("Not implemented");
  }
}
