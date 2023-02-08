import { Controller } from "@hotwired/stimulus";

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

// Connects to data-controller="use-state"
export default class UseStateController extends Controller {
  // use state outlets or stateSelectorValue (there are issues with outlets sometimes,
  // also selector is useful for state controller children classes)
  // if no outlets and no selector, controller will try to use this.element as state source
  static outlets = ["state"];
  static values = {
    stateSelector: String,
  };

  connect() {
    this.initActionsAndState();
  }

  getStateSources() {
    if (this.hasStateOutlet) {
      return this.stateOutlets;
    }

    let elements;
    if (this.hasStateSelectorValue) {
      elements = document.querySelectorAll(this.stateSelectorValue);
    } else {
      throw Error("State not defined or doesn't exist");
    }

    // dirty hack with duck typing
    return [...elements].map((element) => {
      const controllerName = element.dataset.controller
        .split(" ")
        .find((name) => ["state", "state-counter"].includes(name));
      if (!controllerName)
        throw Error(
          `Failed to find state controller in '${element.dataset.controller}'`
        );
      const stateObjectName = camelize(controllerName) + "ObjectValue";
      const stateObject = element.dataset[stateObjectName];
      if (stateObject === undefined)
        throw Error(`Failed to find state object '${stateObjectName}'`);
      return {
        element,
        objectValue: JSON.parse(stateObject),
      };
    });
  }

  initActionsAndState() {
    const sources = this.getStateSources();

    const actions = sources.map(
      (source) => `${source.element.id}@window->${this.identifier}#refresh`
    );

    this.element.dataset.action = [this.element.dataset.action, ...actions]
      .join(" ")
      .trim();

    const states = sources.map((source) => source.objectValue);

    // use instance state variable since we can receive updates from severals state sources
    this.state = states.reduce((acc, state) => Object.assign(acc, state), {});

    this.updateWithState();
  }

  refresh(e) {
    this.state = Object.assign(this.state, e.detail);
    this.updateWithState();
  }

  updateWithState() { }
}
