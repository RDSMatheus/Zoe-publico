import FixedContainer from './FixedContainer';
import fetchDados from './fetchDados';
import Loading from './Loading';

export default class Tracking {
  constructor() {
    this.button = document.querySelector('#btn-rastreio');
    this.input = document.querySelector('#rastreio');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchTracking(rastreio) {
    const track = await fetchDados(`../src/tracker.json`);
    const trackJson = await track.json();
    const findTracker = trackJson.find(item => item.tracker === rastreio)
    console.log(trackJson)
    return findTracker;
    // const url = "api.com"
    // const track = await fetchDados(`${url}/${rastreio}`);
    // const trackJson = await track.json();
    // return trackJson;
  }

  createContainerModal(atributo, classlist) {
    const div = document.createElement('div');
    div.setAttribute(...atributo);
    div.classList.add(...classlist);
    return div;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.containerRastreio.container.innerHTML = '';
    const rastreioModal = this.createContainerModal(
      ['data-rastreio', ''],
      ['rastreio-modal', 'ativo'],
    );

    const rastreioContainer = this.createContainerModal(
      ['data-anime', 'slide-up'],
      ['rastreio-container', 'ativo'],
    );

    const loading = Loading();
    rastreioContainer.appendChild(loading);

    rastreioModal.appendChild(rastreioContainer);

    this.containerRastreio.container.appendChild(rastreioModal);
    this.containerRastreio.container.classList.add('ativo');

    try {
      const track = await this.fetchTracking(this.input.value);

      console.log(track);
      rastreioContainer.removeChild(loading);

      const rastreioTitle = document.createElement('h3');
      rastreioTitle.classList.add('font-1-xl', 'cor-11');
      rastreioTitle.innerHTML = `Confira o rastreio do seu pedido: <span>${track.tracker}</span>`;

      const closeBtn = document.createElement('button');
      closeBtn.classList.add('btn-rastreio-fechar');
      closeBtn.setAttribute('id', 'btn-rastreio-fechar');

      const closeBtnImg = document.createElement('img');
      closeBtnImg.setAttribute('src', './assets/img/close-button.svg');
      closeBtnImg.setAttribute('alt', '');

      closeBtn.appendChild(closeBtnImg);

      const rastreioStatus = document.createElement('ul');
      rastreioStatus.classList.add('rastreio-status');

      const rastreioStatusItem1 = document.createElement('li');
      const rastreioStatusItem1Img = document.createElement('img');
      rastreioStatusItem1Img.setAttribute(
        'src',
        './assets/img/dollar-sign.svg',
      );
      rastreioStatusItem1Img.setAttribute('alt', '');
      rastreioStatusItem1.appendChild(rastreioStatusItem1Img);

      const rastreioStatusItem2 = document.createElement('li');
      const rastreioStatusItem2Img = document.createElement('img');
      rastreioStatusItem2Img.setAttribute(
        'src',
        './assets/img/saiu-entrega.svg',
      );
      rastreioStatusItem2Img.setAttribute('alt', '');
      rastreioStatusItem2.appendChild(rastreioStatusItem2Img);

      const rastreioStatusItem3 = document.createElement('li');
      const rastreioStatusItem3Img = document.createElement('img');
      rastreioStatusItem3Img.setAttribute('src', './assets/img/entregue.svg');
      rastreioStatusItem3Img.setAttribute('alt', '');
      rastreioStatusItem3.appendChild(rastreioStatusItem3Img);

      const rastreioStatusMsg = document.createElement('p');
      rastreioStatusMsg.classList.add('font-1-l');
      rastreioStatusMsg.innerHTML = `Status do pedido: <span>${track.status}</span>`;

      const { status } = track;

      switch (status) {
        case 'Aguardando Pagamento':
          rastreioStatusItem1Img.src = './assets/img/dollar-sign-grey.svg';
          rastreioStatusItem2Img.src = './assets/img/saiu-entrega-grey.svg';
          rastreioStatusItem3Img.src = './assets/img/entregue-grey.svg';
          break;
        case 'Pagamento Efetuado':
          rastreioStatusItem2Img.src = './assets/img/saiu-entrega-grey.svg';
          rastreioStatusItem3Img.src = './assets/img/entregue-grey.svg';
          break;
        case 'Saiu Para Entrega':
          rastreioStatusItem3Img.src = './assets/img/entregue-grey.svg';
          break;
        default:
      }

      rastreioStatus.appendChild(rastreioStatusItem1);
      rastreioStatus.appendChild(rastreioStatusItem2);
      rastreioStatus.appendChild(rastreioStatusItem3);

      rastreioContainer.appendChild(rastreioTitle);
      rastreioContainer.appendChild(closeBtn);
      rastreioContainer.appendChild(rastreioStatus);
      rastreioContainer.appendChild(rastreioStatusMsg);

      rastreioModal.appendChild(rastreioContainer);

      this.containerRastreio.container.appendChild(rastreioModal);
      this.containerRastreio.container.classList.add('ativo');
      this.containerRastreio.container
        .querySelector('#btn-rastreio-fechar')
        .addEventListener('click', () => {
          event.preventDefault();
          this.containerRastreio.container.classList.remove('ativo');
        });
    } catch (error) {
      const rastreioTitle = document.createElement('h3');
      rastreioTitle.classList.add('font-1-xl', 'cor-11');
      rastreioTitle.textContent = `${error.message}!
      Tente novamente.`;
      rastreioContainer.style.maxWidth = '600px';
      rastreioContainer.style.textAlign = 'center';
      rastreioContainer.style.display = 'flex';
      rastreioContainer.style.flexDirection = 'column';
      rastreioContainer.style.alignItems = 'center';
      rastreioContainer.style.margin = '20px';

      const closeBtn = document.createElement('button');
      closeBtn.classList.add('btn-rastreio-fechar');
      closeBtn.setAttribute('id', 'btn-rastreio-fechar');

      const closeBtnImg = document.createElement('img');
      closeBtnImg.setAttribute('src', './assets/img/close-button.svg');
      closeBtnImg.setAttribute('alt', '');

      closeBtn.appendChild(closeBtnImg);

      const rastreioStatus = document.createElement('div');
      rastreioStatus.classList.add('rastreio-status');

      const rastreioStatusError = document.createElement('img');
      rastreioStatusError.setAttribute('src', './assets/img/error.svg');
      rastreioStatusError.style.width = '60px';

      rastreioContainer.appendChild(rastreioTitle);
      rastreioContainer.appendChild(rastreioStatusError);
      rastreioContainer.appendChild(closeBtn);

      rastreioModal.appendChild(rastreioContainer);
      rastreioContainer.removeChild(loading);

      this.containerRastreio.container.appendChild(rastreioModal);
      this.containerRastreio.container.classList.add('ativo');
      this.containerRastreio.container
        .querySelector('#btn-rastreio-fechar')
        .addEventListener('click', () => {
          event.preventDefault();
          this.containerRastreio.container.classList.remove('ativo');
        });
    }
  }

  addEventListeners() {
    this.button.addEventListener('click', this.handleSubmit);
    this.containerRastreio.init();
  }

  init() {
    if (!this.containerRastreio) {
      this.containerRastreio = new FixedContainer(
        '#btn-rastreio',
        '[data-rastreio]',
        '#btn-rastreio-fechar',
      );
    }
    if (this.button) {
      this.containerRastreio.init();
      this.addEventListeners();
    }
    return this;
  }
}
