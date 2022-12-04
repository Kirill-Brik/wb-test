export default class Popup {
  constructor(popupTemplateId, triggerSelector) {
    this.popup = document
      .querySelector(popupTemplateId)
      .content.cloneNode(true)
      .querySelector(".popup");
    this.triggerList = document.querySelectorAll(triggerSelector);
  }

  _scrollOff() {
    const bodyWidth = document.body.clientWidth;
    document.body.style.overflow = "hidden";
    const scrollBarWidth = document.body.clientWidth - bodyWidth;
    document.body.style.paddingRight = scrollBarWidth + "px";
  }

  _scrollOn() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  _escapeHandler(event) {
    console.log(event.key);
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this.popup.style.top = window.pageYOffset + "px";
    this.popup.classList.remove("popup_hidden");
    this._scrollOff();
    document.addEventListener("keydown", this._escapeHandler);
  }

  close() {
    this.popup.classList.add("popup_hidden");
    this._scrollOn();
    document.removeEventListener("keydown", this._escapeHandler);
  }

  _setEventListeners() {
    this._escapeHandler = this._escapeHandler.bind(this);
    this.triggerList.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        this.open();
      });
    });
    this.popup.addEventListener("click", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target.classList.contains("popup__close")
      )
        this.close();
    });
  }

  initialize() {
    this.close();
    this._setEventListeners();
    document.body.append(this.popup);
  }
}
