export default class SelectAll {
  constructor(containerNode, mainButtonSelector, buttonSelector, isCheckedAll) {
    this.container = containerNode;
    this.mainButton = this.container.querySelector(mainButtonSelector);
    this.buttonList = Array.from(
      this.container.querySelectorAll(buttonSelector)
    );
    this.mainButton.checked = isCheckedAll;
  }

  _changeMainButton() {
    if (
      this.buttonList.find((button) => button.checked === false) !== undefined
    )
      this.mainButton.checked = false;
    else this.mainButton.checked = true;
  }

  _setEventListeners() {
    this.mainButton.addEventListener("input", (event) => {
      this.buttonList.forEach((button) => {
        button.checked = this.mainButton.checked;
      });
    });
    this.buttonList.forEach((button) => {
      button.addEventListener("input", (event) => {
        this._changeMainButton();
      });
    });
  }

  initialize() {
    this.buttonList.forEach((button) => {
      button.checked = this.mainButton.checked;
    });
    this._setEventListeners();
  }
}
