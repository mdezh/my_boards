export function fire(name, detail) {
  window.dispatchEvent(new CustomEvent(name, detail ? { detail } : {}));
}
