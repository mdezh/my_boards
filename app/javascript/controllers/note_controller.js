import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="note"
export default class extends Controller {
  static values = {
    user: Number,
  };
  static targets = ["edit", "delete", "nick"];

  refresh({ currentUser, boardOwner }) {
    if (currentUser == this.userValue) {
      this.enableEditBtn();
      this.hideNickname();
    } else {
      this.disableEditBtn();
      this.showNickname();
    }
    if (currentUser == boardOwner || currentUser == this.userValue) {
      this.enableDeleteBtn();
    } else {
      this.disableDeleteBtn();
    }
  }

  enableEditBtn() {
    this.editTarget.classList.remove("disabled");
  }

  disableEditBtn() {
    this.editTarget.classList.add("disabled");
  }

  enableDeleteBtn() {
    this.deleteTarget.classList.remove("disabled");
  }

  disableDeleteBtn() {
    this.deleteTarget.classList.add("disabled");
  }

  showNickname() {
    this.nickTarget.classList.remove("hidden");
  }

  hideNickname() {
    this.nickTarget.classList.add("hidden");
  }
}
