export default class Delivery {
  constructor(
    containerSelector,
    AddressSelector,
    raitingSelector,
    typeSelector,
    scheduleSelector
  ) {
    this.container = document.querySelector(containerSelector);
    this.AddressNode = this.container.querySelector(AddressSelector);
    this.raitingNode = this.container.querySelector(raitingSelector);
    this.typeNode = this.container.querySelector(typeSelector);
    this.scheduleNode = this.container.querySelector(scheduleSelector);
  }

  setValue({ Address, raiting, type, schedule }) {
    this.AddressNode.textContent = this.nameNode.textContent = name;
    if (this.dateNode !== null) this.dateNode.textContent = date;
  }
}
