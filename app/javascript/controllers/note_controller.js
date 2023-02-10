import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="note"
export default class extends UseStateController {
  static values = {
    ...super.values,
    user: Number,
  };
  static targets = ["edit", "delete", "nick", "time"];

  _updateWithState({ current_user, owned, joined, public_rw }) {
    this._removeClass(this.timeTarget, "invisible");

    if (current_user == this.userValue) {
      this._addClass(this.nickTarget, "hidden");
    } else {
      this._removeClass(this.nickTarget, "hidden");
    }

    if (current_user == this.userValue && (owned || (joined && public_rw))) {
      this._removeClass(this.editTarget, "disabled");
    } else {
      this._addClass(this.editTarget, "disabled");
    }

    if (owned || (current_user == this.userValue && joined && public_rw)) {
      this._removeClass(this.deleteTarget, "disabled");
    } else {
      this._addClass(this.deleteTarget, "disabled");
    }

    if (owned || (joined && public_rw)) {
      this._removeClass(this.editTarget, "hidden");
      this._removeClass(this.deleteTarget, "hidden");
    } else {
      this._addClass(this.editTarget, "hidden");
      this._addClass(this.deleteTarget, "hidden");
    }
  }

  _addClass(target, value) {
    target.classList.add(value);
  }

  _removeClass(target, value) {
    target.classList.remove(value);
  }
}
