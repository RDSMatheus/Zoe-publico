export default class FixedContainer {
  constructor(abrir, container, fechar) {
    this.abrir = document.querySelector(abrir);
    this.container = document.querySelector(container);
    this.fechar = document.querySelector(fechar);
    this.activeClass = 'ativo';

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(event) {
    event.preventDefault();
    this.container.classList.toggle(this.activeClass);
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.toggleMenu);
    this.fechar.addEventListener('click', this.toggleMenu);
  }

  init() {
    if (this.abrir) {
      this.addEventListeners();
    }
    return this;
  }
}
