export default class Input {
  constructor(inputSelector, labelSelector) {
    this._inputNodeList = Array.from(document.querySelectorAll(inputSelector));
    this.inputList = this._inputNodeList.map((inputNode) => {
      const label = inputNode.parentNode.querySelector(labelSelector);
      return { node: inputNode, label };
    });
  }

  _errorMessageWather(event) {
    const input = event.target;
    if (input.validity.valueMissing) {
      if (input.getAttribute("data-name-input") !== null)
        input.setCustomValidity("Укажите имя");
      else if (input.getAttribute("data-surname-input") !== null)
        input.setCustomValidity("Введите фамилию");
      else if (input.getAttribute("type") === "email")
        input.setCustomValidity("Укажите электронную почту");
      else if (input.getAttribute("type") === "tel")
        input.setCustomValidity("Укажите номер телефона");
      else if (input.getAttribute("data-id-input") !== null)
        input.setCustomValidity("Укажите индекс");
    } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
      if (input.getAttribute("type") === "email")
        input.setCustomValidity("Проверьте адрес электронной почты");
      else if (input.getAttribute("type") === "tel")
        input.setCustomValidity("Формат: +9 999 999 99 99");
      else if (input.getAttribute("data-id-input") !== null)
        input.setCustomValidity("Формат: 1234567");
    } else {
      input.setCustomValidity("");
    }
  }

  _phoneMaskWatcher(event) {
    const input = event.target;
    let formatedValue = input.value.replace(/\D/g, "");
    input.value = formatedValue;
    if (["7", "8", "9", "+"].includes(formatedValue[0])) {
      if (
        event.inputType === "deleteContentBackward" &&
        input.value.length <= 1
      ) {
        input.value = "+7";
        return;
      }
      const firstSimbol = input.value[0] === "9" ? "9" : "";
      input.value = "+7 " + firstSimbol + formatedValue.slice(1, 4);
      if (formatedValue.length >= 5)
        input.value += " " + formatedValue.slice(4, 7);
      if (formatedValue.length >= 8)
        input.value += " " + formatedValue.slice(7, 9);
      if (formatedValue.length >= 10)
        input.value += " " + formatedValue.slice(9);
    } else {
      if (
        event.inputType === "deleteContentBackward" &&
        input.value.length <= 0
      ) {
        input.value = "";
        return;
      }
      input.value = "+" + input.value.slice(0);
    }
  }

  _setEventListeneners({ node, label }) {
    node.addEventListener("invalid", this._errorMessageWather);
    node.addEventListener("change", () => {
      if (node.value) label.style.visibility = "visible";
      else label.style.visibility = "";
    });
    if (node.getAttribute("type") === "tel")
      node.addEventListener("input", this._phoneMaskWatcher);
  }

  initialize() {
    this.inputList.forEach((input) => {
      this._setEventListeneners(input);
    });
  }
}
