// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

import "@popperjs/core";
import "bootstrap";

import "./init_popovers";

// // Initialize tooltips on the page
// document.addEventListener("turbo:load", () => {
//   const tooltipTriggerList = document.querySelectorAll(
//     '[data-bs-toggle="tooltip"]'
//   );
//   [...tooltipTriggerList].map(
//     (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
//   );
// });
