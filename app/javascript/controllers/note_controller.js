import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="note"
export default class extends Controller {
  static values = {
    user: Number,
  };
  static targets = ["edit", "delete", "nick"];

  refresh({ currentUser, boardOwner }) {
    if (currentUser == this.userValue) {
      this.showEditBtn();
      this.hideNickname();
    } else {
      this.hideEditBtn();
      this.showNickname();
    }
    if (currentUser == boardOwner || currentUser == this.userValue) {
      this.showDeleteBtn();
    } else {
      this.hideDeleteBtn();
    }
  }

  showEditBtn() {
    this.editTarget.classList.remove("disabled");
  }

  hideEditBtn() {
    this.editTarget.classList.add("disabled");
  }

  showDeleteBtn() {
    this.deleteTarget.classList.remove("disabled");
  }

  hideDeleteBtn() {
    this.deleteTarget.classList.add("disabled");
  }

  showNickname() {
    this.nickTarget.classList.remove("hidden");
  }

  hideNickname() {
    this.nickTarget.classList.add("hidden");
  }
}
