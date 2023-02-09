import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="note"
export default class extends UseStateController {
  static values = {
    ...super.values,
    user: Number,
  };
  static targets = ["edit", "delete", "nick", "time"];

  _updateWithState() {
    const { user_state, board_state, user_board_state } = this.state;
    const { current_user } = user_state;
    const { owned, joined } = user_board_state;
    const { public_rw } = board_state;

    this.removeClass(this.timeTarget, "invisible");

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
