// Initialize popovers on the page
// Add html content for popovers with .popover-with-html

const initAndRefreshPopovers = () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].forEach((element) => {
    const popover = bootstrap.Popover.getInstance(element);
    popover && popover.hide();
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
};

document.addEventListener("turbo:load", initAndRefreshPopovers);
document.addEventListener("turbo:frame-load", initAndRefreshPopovers);
