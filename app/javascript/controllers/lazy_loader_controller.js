import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="lazy-loader"
export default class extends Controller {
  static values = {
    src: String,
    status: String,
    indicator: String,
  };
  static classes = ["hidden"];

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
      const timeZone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;
      fetch(this.srcValue, {
        headers: {
          Accept: "text/vnd.turbo-stream.html",
          "X-Time-Zone": timeZone ? timeZone : "UTC",
        },
      })
        .then((r) => r.text())
        .then((html) => Turbo.renderStreamMessage(html))
        .then(() => (this.statusValue = "complete"))
        .then(() => this.observer.unobserve(this.element))
        .catch((e) => {
          console.error("Something goes wrong on lazy loading:", e);
          this.statusValue = "";
        })
        .finally(() => this.hideIndicator());
    }
  }

  showIndicator() {
    window.requestAnimationFrame(() => {
      this.indicator?.classList.remove(...this.hiddenClasses);
    });
  }

  hideIndicator() {
    window.requestAnimationFrame(() => {
      this.indicator?.classList.add(...this.hiddenClasses);
    });
  }

  disconnect() {
    this.observer.unobserve(this.element);
  }
}
