export default class Dropdown {
  constructor(dropdownNode, buttonSelector, contentSelector, isOpen) {
    this.dropdown = dropdownNode;
    this.button = this.dropdown.querySelector(buttonSelector);
    this.content = this.dropdown.querySelector(contentSelector);
    this.contentHeight = this.content.offsetHeight;
    this.isOpen = isOpen;
  }

  open() {
    this.content.style.height = this.contentHeight + "px";
    this.content.style.visibility = "visible";
  }

  close() {
    this.content.style.height = 0;
  }

  _handleShow() {
    if (!this.isOpen) this.open();
    else this.close();
    this.isOpen = !this.isOpen;
  }

  _setEventListeners() {
    this.button.addEventListener("click", (event) => {
      this._handleShow();
    });
    this.content.addEventListener("transitionend", (event) => {
      if (!this.isOpen) this.content.style.visibility = "hidden";
    });
  }

  initialize() {
    this.content.style.height = this.contentHeight + "px";
    this.content.style.padding = "0";
    this.content.style.overflow = "hidden";
    if (this.isOpen) this.open();
    else this.close();
    this.content.style.transition = "height .5s";
    this._setEventListeners();
  }
}
