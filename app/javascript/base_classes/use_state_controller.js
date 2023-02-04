import { Controller } from "@hotwired/stimulus";

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

export default class UseStateController extends Controller {
  // use outlets or stateSelectorValue (there are issues with outlets sometimes,
  // also selector is useful for state controller children classes)
  static outlets = ["state"];
  static values = {
    hiddenClass: { type: String, default: "hidden" },
    primarySelector: { type: String, default: "" },
    secondarySelector: { type: String, default: "" },
    stateSelector: { type: String, default: "" },
  };

  connect() {
    this.primaryElements = this.primarySelectorValue
      ? document.querySelectorAll(this.primarySelectorValue)
      : [this.element];

    this.secondaryElements = this.secondarySelectorValue
      ? document.querySelectorAll(this.secondarySelectorValue)
      : undefined;

    this.initActionsAndState();
  }

  getStateSources() {
    let sources;
    if (this.hasStateOutlet) {
      sources = this.stateOutlets;
    } else if (this.stateSelectorValue) {
      const elements = document.querySelectorAll(this.stateSelectorValue);
      if (elements.length > 0) {
        // dirty hack with duck typing
        sources = [...elements].map((element) => {
          const controllerName = element.dataset.controller
            .split(" ")
            .find((name) => name.startsWith("state"));
          if (!controllerName) throw Error("Failed to find state controller");
          const dataPropName = camelize(controllerName) + "ObjectValue";
          return {
            element,
            objectValue: JSON.parse(element.dataset[dataPropName]),
          };
        });
      }
    }
    if (!sources) {
      throw Error("Data sources are not defined or don't exist!");
    }
    return sources;
  }

  initActionsAndState() {
    const sources = this.getStateSources();

    const actions = sources.map(
      (outlet) => `${outlet.element.id}@window->${this.identifier}#refresh`
    );

    this.element.dataset.action = [this.element.dataset.action, ...actions]
      .join(" ")
      .trim();

    const states = sources.map((outlet) => outlet.objectValue);
    this.state = states.reduce((acc, state) => Object.assign(acc, state), {});

    this.updateWithState();
  }

  refresh(e) {
    this.state = Object.assign(this.state, e.detail);
    this.updateWithState();
  }

  checkFunction() {
    throw Error("Not implemented!");
  }

  updateWithState() {
    const checkResult = this.checkFunction();
    if (checkResult === this.prevCheckResult) return;

    this.prevCheckResult = checkResult;
    if (checkResult) {
      this.showHide(this.primaryElements, this.secondaryElements);
    } else {
      this.showHide(this.secondaryElements, this.primaryElements);
    }
  }

  showHide(toShow, toHide) {
    toShow?.forEach((element) =>
      element.classList.remove(this.hiddenClassValue)
    );
    toHide?.forEach((element) => element.classList.add(this.hiddenClassValue));
  }
}
