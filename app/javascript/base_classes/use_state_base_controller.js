import { Controller } from "@hotwired/stimulus";

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

export default class UseStateBaseController extends Controller {
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
      elements = [this.element];
    }

    // dirty hack with duck typing
    return [...elements].map((element) => {
      const controllerName = element.dataset.controller
        .split(" ")
        .find((name) => name.startsWith("state")); // expect state or state-counter
      if (!controllerName) throw Error("Failed to find state controller");
      const stateObject =
        element.dataset[camelize(controllerName) + "ObjectValue"];
      if (stateObject === undefined) throw Error("Failed to find state object");
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
