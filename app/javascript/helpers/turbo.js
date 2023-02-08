// use this to guarantee right navigation action for turbo-frame (advance or replace)
export function promoteToFrameVisit(
  element /*: string || String || FrameElement */,
  src /*: string */,
  action = null
) {
  if (!element) throw Error("Turbo-frame not defined");

  if (typeof element == "string" || element instanceof String) {
    const id = element;
    element = document.getElementById(id);
    if (!element) throw Error("Element #${id} not found");
  }

  const link = document.createElement("a");
  link.setAttribute("href", src);
  if (action) {
    link.setAttribute("data-turbo-action", action); // you can skip this if the <turbo-frame> already declares [data-turbo-action]
  }
  link.setAttribute("hidden", "");
  element.appendChild(link);
  link.click();
  element.removeChild(link);
}
