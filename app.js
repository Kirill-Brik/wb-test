import Input from "./components/input.js";
// import Dropdown from "./components/dropdown.js";
import SelectAll from "./components/selectAll.js";
import Validation from "./components/validation.js";
import Form from "./components/form.js";

const inputSelecorList = [
  "[data-name-input]",
  "[data-surname-input]",
  "[type='email']",
  "[type='tel']",
  "[data-id-input]",
];

// const dropdownList = Array.from(document.querySelectorAll(".dropdown")).map(
//   (dropdownNode) => {
//     const dropdown = new Dropdown(
//       dropdownNode,
//       ".dropdown__button",
//       ".dropdown__content",
//       true
//     );
//     dropdown.initialize();
//     return dropdown;
//   }
// );
const selectAllList = Array.from(document.querySelectorAll(".select-all")).map(
  (selectAllNode) => {
    const selectAll = new SelectAll(
      selectAllNode,
      ".select-all__main",
      ".select-all__button",
      true
    );
    selectAll.initialize();
    return selectAll;
  }
);

const inputList = inputSelecorList.map((selector) => {
  const input = new Input(selector, ".input__label");
  input.initialize();
  return input;
});

const mainFormValidation = new Validation(
  '[name="shoping-cart"]',
  inputSelecorList,
  ".input__label",
  ".input__caption"
);

const mainForm = new Form({
  formSelector: '[name="shoping-cart"]',
  onSubmit: (formNode) => {
    mainFormValidation.elnable();
    if (mainFormValidation.checkFormValidity() === false) {
      const invalidInput = mainFormValidation.getInvalidInput();
      invalidInput.scrollIntoView();
    } else {
      const formData = new FormData(formNode);
      for (let [key, value] of formData) {
        console.log(`${key} - ${value}`);
      }
    }
  },
});

mainForm.initialize();
