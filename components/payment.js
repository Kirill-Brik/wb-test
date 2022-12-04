export default class Payment {
  constructor(containerSelector, LogoSelector, NameSelector, DateSelector) {
    this.container = document.querySelector(containerSelector);
    this.logoNode = this.container.querySelector(LogoSelector);
    this.nameNode = this.container.querySelector(NameSelector);
    this.dateNode = this.container.querySelector(DateSelector);
  }

  setValue({ imgSrc, name, date }) {
    this.logoNode.setAttribute("src", imgSrc);
    this.nameNode.textContent = name;
    if (this.dateNode !== null) this.dateNode.textContent = date;
  }
}
