import { Controller } from "@hotwired/stimulus";

export default class UseStateController extends Controller {
  static outlets = ["state"];
  static values = {
    hiddenClass: { type: String, default: "hidden" },
    primarySelector: { type: String, default: "" },
    secondarySelector: { type: String, default: "" },
  };

  connect() {
    const actions = this.stateOutlets.map(
      (outlet) => `${outlet.element.id}@window->${this.identifier}#refresh`
    );
    this.element.dataset.action = [
      ...(this.element.dataset.action ?? "").split(" ").filter(Boolean),
      ...actions,
    ].join(" ");

    const states = this.stateOutlets.map((outlet) => outlet.objectValue);
    this.state = states.reduce((acc, state) => Object.assign(acc, state), {});

    this.primaryElements = this.primarySelectorValue
      ? querySelectorAll(this.primarySelectorValue)
      : [this.element];

    this.secondaryElements = this.secondarySelectorValue
      ? querySelectorAll(this.secondarySelectorValue)
      : undefined;

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

export { UseStateController };
