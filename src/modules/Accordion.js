export default class Accordion {
  constructor(lista) {
    this.lista = document.querySelectorAll(lista);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const element = target;
    element.classList.toggle('ativo');
    element.nextElementSibling.classList.toggle('ativo');
    console.log('clicou');
  }

  addEventListeners() {
    this.lista.forEach((item) =>
      item.addEventListener('click', this.handleClick),
    );
  }

  init() {
    if (this.lista) {
      this.addEventListeners();
      console.log(this.lista);
    }
  }
}
