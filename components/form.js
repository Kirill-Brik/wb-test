export default class Form {
  constructor({ formSelector, onSubmit }) {
    this.form = document.querySelector(formSelector);
    this.onSubmit = onSubmit;
  }

  _setEventListener() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(this.form);
    });
  }

  initialize() {
    this._setEventListener();
  }
}
