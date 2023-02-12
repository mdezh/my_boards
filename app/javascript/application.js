// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

import "helpers";

import "@popperjs/core";
import "bootstrap";

// import "./init_tooltips";
// import "./init_popovers";

import { parse, fire } from "helpers";

Turbo.StreamActions.event = function() {
  const details = parse(this.getAttribute("details"));
  Object.keys(details).forEach((key) => fire(key, details[key]));
};
