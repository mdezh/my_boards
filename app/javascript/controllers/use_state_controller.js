import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="use-state"
export default class UseStateController extends Controller {
  static values = {
    use: Array,
  };

  connect() {
    this.state = {};
    this._addActions();
    this._requestState();
  }

  refresh(e) {
    if (e.detail == undefined) return;

    this.state = Object.assign(this.state, { [e.type]: e.detail });
    this._handleStateChange();
  }

  _addActions() {
    const actions = this.useValue.map(
      (id) => `${id}@window->${this.identifier}#refresh`
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
