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
  const name = this.getAttribute("name");
  const detail = parse(this.getAttribute("detail"));
  fire(name, detail);
};
