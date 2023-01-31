import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="add-note"
export default class extends Controller {
  refresh({ currentUser, boardOwner, boardSharingStatus }) {
    if (currentUser == boardOwner || boardSharingStatus == "public_rw") {
      this.showAddNoteForm();
    } else {
      this.hideAddNoteForm();
    }
  }

  showAddNoteForm() {
    this.element.classList.remove("hidden");
  }

  hideAddNoteForm() {
    this.element.classList.add("hidden");
  }
}
