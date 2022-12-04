export default class Validation {
  constructor(formSelector, inputSelectorList, labelSelecor, captionSelector) {
    this.form = document.querySelector(formSelector);
    this.inputList = inputSelectorList.map((inputSelector) => {
      const inputNode = this.form.querySelector(inputSelector);
      return {
        inputNode,
        labelNode: inputNode.parentNode.querySelector(labelSelecor),
        captionNode: inputNode.parentNode.querySelector(captionSelector),
      };
    });
  }

  _changeValidity({ inputNode, captionNode }, caption) {
    inputNode.checkValidity();
    if (inputNode.validity.valid === false) {
      inputNode.classList.add("input__field_type_error");
      captionNode.classList.add("input__caption_type_error");
      captionNode.textContent = inputNode.validationMessage;
    } else {
      inputNode.classList.remove("input__field_type_error");
      captionNode.classList.remove("input__caption_type_error");
      captionNode.textContent = caption;
    }
  }

  _setEventListeners(input, caption) {
    input.inputNode.addEventListener("change", (event) => {
      this._changeValidity(input, caption);
    });
  }

  checkFormValidity() {
    if (this.getInvalidInput() === undefined) return true;
    else return false;
  }

  getInvalidInput() {
    const input = this.inputList.find((input) => {
      return input.inputNode.validity.valid === false;
    });
    return input.inputNode;
  }

  elnable() {
    this.inputList.forEach((input) => {
      const captionText = input.captionNode.textContent;
      this._setEventListeners(input, captionText);
      this._changeValidity(input, captionText);
    });
  }
}
