export function parse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}
