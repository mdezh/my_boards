import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="notes"
export default class extends Controller {
  static outlets = ["note", "add-note"];
  static values = {
    user: Number,
    boardState: Object,
  };

  boardStateValueChanged() {
    this.refreshNotes();
    this.refreshAddNoteForm();
  }

  noteOutletConnected(note) {
    this.refreshNote(note);
  }

  refreshNotes() {
    this.noteOutlets.forEach((note) => this.refreshNote(note));
  }

  refreshNote(note) {
    note.refresh({
      currentUser: this.userValue,
      boardOwner: this.boardStateValue.owner,
      boardSharingStatus: this.boardStateValue.sharing_status,
    });
  }

  refreshAddNoteForm() {
    this.addNoteOutlet.refresh({
      currentUser: this.userValue,
      boardOwner: this.boardStateValue.owner,
      boardSharingStatus: this.boardStateValue.sharing_status,
    });
  }
}
