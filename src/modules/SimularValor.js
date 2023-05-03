import Loading from './Loading';
import fetchDados from './fetchDados';

export default class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    if (this.form[0].value && this.form[1].value) {
      const loading = Loading();
      this.container.appendChild(loading);
      try {
        const dadosFetch = await fetchDados('../src/produtos.json', 'GET');
        const dadosJson = await dadosFetch.json();
        console.log(dadosJson);
        return dadosJson;
      } catch (error) {
        console.log(error);
      } finally {
        this.container.removeChild(loading);
      }
    }
    return null;
  }

  createDiv(valor) {
    const divAnterior = this.container.querySelector('.valores-popup');
    if (divAnterior) {
      this.container.removeChild(divAnterior);
    }
    const div = document.createElement('div');
    div.className = 'valores-popup cor-p5 ativo';
    div.setAttribute('data-anime', 'slide-left');
    div.innerHTML = `
    <h1>VALOR R$${valor},00</h1>
  `;
    this.container.appendChild(div);
    return div;
  }

  handleClick(event) {
    event.preventDefault();
    this.dadosFetch().then((dadosJson) => {
      const select1 = this.form[0].value.toLowerCase().trim();
      const select2 = this.form[1].value.toLowerCase().trim();

      let value = null;
      console.log(select1, select2);
      if (dadosJson) {
        dadosJson.forEach((item) => {
          console.log(item);
          const origem = item.source.toLowerCase();
          console.log(origem);
          const destino = item.destination.toLowerCase();
          if (
            (origem === select1 && destino === select2) ||
            (origem === select2 && destino === select1)
          ) {
            value = item.price;
            console.log(value);
          }
        });
      } else {
        // eslint-disable-next-line no-alert
        window.alert('[ERROR] Insira um valor válido!');
      }

      if (value) {
        console.log(value);
        this.createDiv(value);
      }
    });
  }

  addEventListeners() {
    this.abrir.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.abrir) this.addEventListeners();
  }
}
