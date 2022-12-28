import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="lazy-loader"
export default class extends Controller {
  static values = {
    src: String,
    status: String,
  };

  connect() {
    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries.slice(-1)[0];
      if (lastEntry?.isIntersecting) {
        this.load();
      }
    });
    this.observer.observe(this.element);
  }

  load() {
    if (!this.statusValue) {
      this.statusValue = "pending";
      fetch(this.srcValue, {
        headers: {
          Accept: "text/vnd.turbo-stream.html",
        },
      })
        .then((r) => r.text())
        .then((html) => Turbo.renderStreamMessage(html))
        .then(() => (this.statusValue = "complete"))
        .then(() => this.observer.unobserve(this.element))
        .catch((e) => {
          console.log("Something goes wrong on lazy loading:", e);
          this.statusValue = "";
        });
    }
  }

  disconnect() {
    this.observer.unobserve(this.element);
  }
}
