import { UseStateController } from "../base_classes/use_state_controller";

// Connects to data-controller="note"
export default class extends UseStateController {
  static values = {
    ...super.values,
    user: Number,
  };
  static targets = ["edit", "delete", "nick"];

  updateWithState() {
    const { current_user, owned, joined, public_rw } = this.state;

    if (current_user == this.userValue) {
      this.addClass(this.nickTarget, "hidden");
    } else {
      this.removeClass(this.nickTarget, "hidden");
    }

    if (current_user == this.userValue && (owned || (joined && public_rw))) {
      this.removeClass(this.editTarget, "disabled");
    } else {
      this.addClass(this.editTarget, "disabled");
    }

    if (owned || (current_user == this.userValue && joined && public_rw)) {
      this.removeClass(this.deleteTarget, "disabled");
    } else {
      this.addClass(this.deleteTarget, "disabled");
    }

    if (owned || (joined && public_rw)) {
      this.removeClass(this.editTarget, "hidden");
      this.removeClass(this.deleteTarget, "hidden");
    } else {
      this.addClass(this.editTarget, "hidden");
      this.addClass(this.deleteTarget, "hidden");
    }
  }

  addClass(target, value) {
    target.classList.add(value);
  }

  removeClass(target, value) {
    target.classList.remove(value);
  }
}
