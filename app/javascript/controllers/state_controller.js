import { Controller } from "@hotwired/stimulus";
import { parse, fire } from "helpers";

// Connects to data-controller="state"
export default class StateController extends Controller {
  static values = {
    init: { type: String, default: "null" },
    object: Object,
  };

  initialize() {
    // next line prevents state reinitialization after bw/fw navigation
    if (!this.hasObjectValue) {
      this.objectValue = {
        state: parse(this.initValue),
        trigger: 0,
      };
    }
    this._addActions();
  }

  fireState(e) {
    let eventName = this.element.id;
    const receiver = e.detail;
    if (typeof receiver == "string") {
      eventName += `_to_${receiver}`;
    }
    this._fireStateWithName(eventName);
  }

  setState(e) {
    this._updateState(e.detail);
  }

  objectValueChanged() {
    this._fireStateWithName(this.element.id);
  }

  _updateState(changes) {
    let state = this.objectValue.state;
    if (typeof state != typeof changes) {
      throw Error("The update doesn't match the state type");
    }

    state = typeof state == "object" ? { ...state, ...changes } : changes;

    // use a trigger to ensure the event fires even if the state remains the same
    const trigger = 1 + (this.objectValue.trigger ?? 0);
    this.objectValue = {
      state,
      trigger,
    };
  }

  _addActions() {
    const dataset = this.element.dataset;

    if (dataset.actionsAdded?.includes(this.identifier)) return;

    dataset.actionsAdded = (
      (dataset.actionsAdded ?? "") + ` ${this.identifier}`
    ).trim();
    dataset.action = [dataset.action, ...this._getNewActions()]
      .join(" ")
      .trim();
  }

  _getNewActions() {
    return [
      `fire_${this.element.id}@window->${this.identifier}#fireState`,
      `set_${this.element.id}@window->${this.identifier}#setState`,
    ];
  }

  _fireStateWithName(eventName) {
    if (this.objectValue.state == null) {
      return;
    }

    fire(eventName, {
      name: this.element.id,
      value: this.objectValue.state,
    });
  }
}
