import { parse, fire } from "helpers";

Turbo.StreamActions.event = function() {
  const details = parse(this.getAttribute("details"));
  Object.keys(details).forEach((key) => fire(key, details[key]));
};
