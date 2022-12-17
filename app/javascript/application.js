// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

import "@popperjs/core";
import "bootstrap";

// // Initialize tooltips on the page
// document.addEventListener("turbo:load", () => {
//   const tooltipTriggerList = document.querySelectorAll(
//     '[data-bs-toggle="tooltip"]'
//   );
//   [...tooltipTriggerList].map(
//     (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
//   );
// });

// Initialize popovers on the page
// Add html content for popovers with .popover-with-html
document.addEventListener("turbo:load", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].forEach((element) => {
    if (element.classList.contains("popover-with-html")) {
      const id = element.id;
      const elemForContent = document.querySelector(`#${id}-html`);
      if (elemForContent) {
        element.setAttribute("data-bs-html", "true");
        element.setAttribute("data-bs-content", elemForContent.innerHTML);
      }
    }
    new bootstrap.Popover(element);
  });
});
