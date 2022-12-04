import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({
    title,
    popupTemplateId,
    triggerSelector,
    formTemplateId,
    onCreate,
    onSubmit,
  }) {
    super(popupTemplateId, triggerSelector);
    this.form = document
      .querySelector(formTemplateId)
      .content.cloneNode(true)
      .querySelector(".form");
    this.popup.querySelector(".popup__title").textContent = title;
    this.onCreate = onCreate;
    this.onSubmit = onSubmit;
  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(new FormData(this.form));
      this.close();
    });
  }

  initialize() {
    super.initialize();
    this.popup.querySelector(".popup__card").append(this.form);
    this.onCreate(this.form);
  }
}
