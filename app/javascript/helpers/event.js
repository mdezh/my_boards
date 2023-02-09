export function fire(name, detail) {
  return window.dispatchEvent(new CustomEvent(name, detail ? { detail } : {}));
}
