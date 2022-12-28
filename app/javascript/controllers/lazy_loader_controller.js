import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="lazy-loader"
export default class extends Controller {
  static values = {
    src: String,
    status: String,
    indicator: String,
  };

  connect() {
    this.observer = new IntersectionObserver((entries) => {
      const lastEntry = entries.slice(-1)[0];
      lastEntry?.isIntersecting && this.load();
    });
    this.indicator = this.indicatorValue
      ? document.querySelector(this.indicatorValue)
      : null;
    this.observer.observe(this.element);
  }

  load() {
    if (!this.statusValue) {
      this.statusValue = "pending";
      this.showIndicator();
      fetch(this.srcValue, {
        headers: {
          Accept: "text/vnd.turbo-stream.html",
        },
      })
        .then((r) => r.text())
        .then((html) => (this.hideIndicator(), Turbo.renderStreamMessage(html)))
        .then(() => (this.statusValue = "complete"))
        .then(() => this.observer.unobserve(this.element))
        .catch((e) => {
          this.hideIndicator();
          console.log("Something goes wrong on lazy loading:", e);
          this.statusValue = "";
        });
    }
  }

  showIndicator() {
    this.indicator?.classList.remove("invisible");
  }

  hideIndicator() {
    this.indicator?.classList.add("invisible");
  }

  disconnect() {
    this.observer.unobserve(this.element);
  }
}
