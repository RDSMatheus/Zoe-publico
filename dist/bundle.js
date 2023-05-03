/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/FixedContainer.js
class FixedContainer {
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

;// CONCATENATED MODULE: ./src/modules/NavFixed.js
class NavFixed {
  constructor(nav) {
    this.nav = document.querySelector(nav);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = window.scrollY - 25;
    const { height } = this.nav.getBoundingClientRect();
    if (windowHeight > height) {
      this.nav.classList.add("ativo")
    } else {
      this.nav.classList.remove("ativo")
    }
    
  }

  addEventListeners() {
    window.addEventListener('scroll', ()=>{
      this.handleScroll();
      window.removeEventListener("scroll", this.handleScroll)
    });
  }

  init() {
    this.addEventListeners();
  }
}

;// CONCATENATED MODULE: ./src/modules/SlideIn.js
class SlideIn{
  constructor(anime){
    this.anime = document.querySelectorAll(anime);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(){
    const windowHeight = window.innerHeight * .6;

    this.anime.forEach(item => {
      const {top} = item.getBoundingClientRect();
      const animeHeight = windowHeight - top > 0
      if(animeHeight){
        item.classList.add('ativo');
      } else {
        item.classList.remove('ativo');
      }
    })
  }

  addEventListeners(){
    window.addEventListener('scroll', this.handleScroll);
  }

  init(){
    this.addEventListeners();
    this.anime[0].classList.add('ativo')
    return this;
  }
}
;// CONCATENATED MODULE: ./src/modules/Loading.js
function Loading_loading (){
  const div = document.createElement("div");
  div.classList.add("loading");
  return div;
}
;// CONCATENATED MODULE: ./src/modules/fetchDados.js
async function fetchDados(
  url,
  method = 'GET',
  headers = {},
  body = null,
) {
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  try {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
}

;// CONCATENATED MODULE: ./src/modules/SimularValor.js



class SimularValores {
  constructor(abrir, form, container) {
    this.abrir = document.querySelector(abrir);
    this.form = document.querySelectorAll(`${form} select`);
    this.container = document.querySelector(container);

    this.handleClick = this.handleClick.bind(this);
    this.dadosFetch = this.dadosFetch.bind(this);
  }

  async dadosFetch() {
    if (this.form[0].value && this.form[1].value) {
      const loading = Loading_loading();
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
      const select1 = this.form[0].value.toLowerCase().trim().replace(/-/g, ' ');
      const select2 = this.form[1].value.toLowerCase().trim().replace(/-/g, ' ');

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

;// CONCATENATED MODULE: ./src/modules/Formulario.js


class Formulario {
  constructor(button, form, url, method, header) {
    this.button = document.querySelector(button);
    this.form = document.querySelector(form);
    this.url = url;
    this.method = method;
    this.headers = header;

    this.handleClick = this.handleClick.bind(this);
  }

  static formatarTelefone(telefone) {
    if (telefone.length > 13) {
      telefone = telefone.slice(0, 15);
    }
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    return telefone;
  }

  static validarTelefone(telefone) {
    let telefoneValidar = telefone;
    telefoneValidar = telefoneValidar.replace(/[^\d]+/g, '');

    if (telefoneValidar.length !== 10 && telefoneValidar.length !== 11) {
      return false;
    }

    const ddd = telefoneValidar.substring(0, 2);
    if (
      ![
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '21',
        '22',
        '24',
        '27',
        '28',
        '31',
        '32',
        '33',
        '34',
        '35',
        '37',
        '38',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '51',
        '53',
        '54',
        '55',
        '61',
        '62',
        '63',
        '64',
        '65',
        '66',
        '67',
        '68',
        '69',
        '71',
        '73',
        '74',
        '75',
        '77',
        '79',
        '81',
        '82',
        '83',
        '84',
        '85',
        '86',
        '87',
        '88',
        '89',
        '91',
        '92',
        '93',
        '94',
        '95',
        '96',
        '97',
        '98',
        '99',
      ].includes(ddd)
    ) {
      return false;
    }

    return true;
  }

  static formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return cpf;
  }

  static formatarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ''); // remove caracteres não numéricos
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    return cnpj;
  }

  static validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(1))) return false;

    return true;
  }

  static validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i += 1) {
      sum += Number(cpf.charAt(i)) * (10 - i);
    }
    let mod = sum % 11;
    let digit = mod < 2 ? 0 : 11 - mod;
    if (digit !== Number(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i += 1) {
      sum += Number(cpf.charAt(i)) * (11 - i);
    }
    mod = sum % 11;
    digit = mod < 2 ? 0 : 11 - mod;
    if (digit !== Number(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  static validarEmail(email) {
    const regex =
      /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    return regex.test(email);
  }

  static erroValidacao(input, erro) {
    const span = document.createElement('span');
    span.style.color = 'red';
    span.innerText = `Erro no ${erro}`;
    input.insertAdjacentElement('afterend', span);
    return span;
  }

  limparInput() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
    });
  }

  async handleClick(event) {
    event.preventDefault();
    console.log(typeof this.form);
    const cpf = this.form.querySelector("input[name='cpf']");
    const email = this.form.querySelector('#email');
    const telefoneInput = this.form.querySelector('#cel');
    const telefone = telefoneInput ? telefoneInput.value : '';
    const nome = this.form.querySelector("input[name='fullName']");

    if (nome.value.length < 3) {
      alert('Insira um nome valido');
      return;
    }

    if (telefone && !Formulario.validarTelefone(telefone)) {
      alert('Telefone inválido!');
      return;
    }

    if (
      cpf &&
      cpf.value !== '' &&
      !Formulario.validarCPF(Formulario.formatarCPF(cpf.value))
    ) {
      Formulario.erroValidacao(cpf, 'cpf');
      return;
    }

    if (email && email.value !== '' && !Formulario.validarEmail(email.value)) {
      Formulario.erroValidacao(telefone, 'telefone');
      return;
    }

    if (this.method === ('GET' || 0)) {
      fetchDados(this.url, this.method).then((response) =>
        console.log(response),
      );
    } else {
      const formData = new FormData(this.form);
      const formJson = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of formData) {
        formJson[key] = value;
      }
      try {
        await fetchDados(this.url, this.method, this.headers, formJson);
        this.limparInput();
        alert('Enviado!');
      } catch (error) {
        console.log(error);
      }
    }
  }

  addEventListeners() {
    this.button.addEventListener('click', this.handleClick);
  }

  init() {
    if (this.button) this.addEventListeners();
    return this;
  }
}

;// CONCATENATED MODULE: ./src/modules/Carousel.js




class FormCarousel {
  constructor(form, proximo, anterior, nav) {
    this.form = document.querySelector(form);
    this.proximo = document.querySelector(proximo);
    this.anterior = document.querySelector(anterior);
    this.nav = document.querySelectorAll(nav);
    this.activeClass = 'ativo';
    this.index = 0;
    this.currentNav = this.nav[this.index];
    if (this.form) {
      this.currentForm = this.form.children[this.index];
      this.cpfInput = this.currentForm.querySelector('#cpf');
      this.email = this.currentForm.querySelector('#email');
      this.cel = this.form.querySelectorAll('input[name="phone"]');
      this.citySender = this.form.querySelector('#cidade-remetente');
      this.cityRecipient = this.form.querySelector('#cidade-destinatario');
      this.price = this.form.querySelector('#preco');
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('handlesubmit');
    const productId = await this.fetchProduct();
    const senders = {};
    const recipients = {};
    const product = {};
    const nameRecipent = document.querySelector('#name-recipient');
    const sendersInputs = document.querySelectorAll(
      '[data-fazer-pedido="sender"] input, [data-fazer-pedido="sender"] select, [data-fazer-pedido="sender"] textarea',
    );
    sendersInputs.forEach((input) => {
      senders[input.name] = input.value;
    });
    const recipientsInputs = document.querySelectorAll(
      '[data-fazer-pedido="recipient"] input, [data-fazer-pedido="recipient"] select, [data-fazer-pedido="recipient"] textarea',
    );
    recipientsInputs.forEach((input) => {
      recipients[input.name] = input.value;
    });
    const priceFormatado = Number(
      this.price.value.replace('R$', ' ').replace(',', '.'),
    );
    product.price = priceFormatado;
    product.source = this.citySender.value;
    product.destination = this.cityRecipient.value;
    product.id = productId;
    const formJson = {
      senders,
      recipients,
      product,
    };

    const termos = document.querySelector('#termos');

    if (nameRecipent.value.length < 3) {
      alert('Nome inválido!');
      return;
    }

    if (termos && !termos.checked) {
      termos.classList.add('erro');
      return;
    }

    if (!Formulario.validarTelefone(this.cel[this.index].value)) {
      termos.classList.add('erro');
      return;
    }

    if (!this.price.hasAttribute('readonly')) {
      alert('Não tente modificar o HTML!');
      this.limparInput();
      return;
    }

    const loading = Loading_loading();
    this.currentForm.appendChild(loading);

    try {
      const enviar = await fetchDados(
        `https://jsonplaceholder.typicode.com/posts`,
        'POST',
        { 'Content-Type': 'application/json' },
        formJson,
      );

      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }
      console.log(this.confirmacaoEnvio);
      const div = this.confirmacaoEnvio(enviar.ok);
      this.form.appendChild(div);
      console.log(enviar);
      div.querySelector('.voltar').addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < children.length; i += 1) {
          const item = children[i];
          item.classList.remove(this.activeClass);
          if (item.contains(loading)) {
            item.removeChild(loading);
          }
        }
        this.index = 0;
        this.currentForm = this.form.children[this.index];
        this.currentForm.classList.add(this.activeClass);
        this.nav.forEach((item) => item.classList.remove(this.activeClass));
        this.currentNav = this.nav[this.index];
        this.currentNav.classList.add(this.activeClass);
      });
      // this.limparInput();
    } catch (error) {
      console.log(this.confirmacaoEnvio);
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }

      const div = this.confirmacaoEnvio(false, error.message);
      this.form.appendChild(div);

      div.querySelector('.voltar').addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < children.length; i += 1) {
          const item = children[i];
          item.classList.remove(this.activeClass);
          if (item.contains(loading)) {
            item.removeChild(loading);
          }
        }
        this.index = 0;
        this.currentForm = this.form.children[this.index];
        this.currentForm.classList.add(this.activeClass);
        this.nav.forEach((item) => item.classList.remove(this.activeClass));
        this.currentNav = this.nav[this.index];
        this.currentNav.classList.add(this.activeClass);
      });
    }
  }

  async fetchProduct() {
    const produtos = await fetchDados(`../src/produtos.json`, 'GET');
    const produtosResponse = await produtos.json();
    const selectSender = this.citySender.value.toLowerCase().trim();
    const selectRecipient = this.cityRecipient.value.toLowerCase().trim();
    let productId;
    produtosResponse.forEach((produto) => {
      console.log(produto);
      const { source, destination, price, id } = produto;
      const sourceFormatado = source.toLowerCase().trim();
      const destinationFormatado = destination.toLowerCase().trim();
      const preco = this.form.querySelector('#preco');
      console.log(
        `valor do select ${selectSender}, valor do json ${destination}`,
      );

      if (
        (selectSender === sourceFormatado &&
          selectRecipient === destinationFormatado) ||
        (selectSender === destinationFormatado &&
          selectRecipient === sourceFormatado)
      ) {
        preco.value = `R$ ${price},00`;
        productId = id;
      }
      if (selectSender === '' || selectRecipient === '') {
        preco.value = '';
      }
    });

    return productId;
  }

  confirmacaoEnvio(status, erro) {
    if (status) {
      const div = document.createElement('div');
      div.classList.add('confirmacao-envio', this.activeClass);
      div.innerHTML = `
      <img src="../dist/assets/img/checked.svg">
      <h2>Formulário enviado<h2>
      <button class="btn voltar">Voltar</button>`;
      return div;
    }

    if (!status) {
      const div = document.createElement('div');
      div.classList.add(this.activeClass, 'confirmacao-envio');
      div.innerHTML = `
      <img src="../dist/assets/img/error.svg">
      <h2>${erro}<h2>
      <div class="confirmacao-envio-btn">
        <button class="btn voltar">Tentar Novamente</button>
        <a href="../dist/contato.html" class="btn">Fale Conosco</a>
      </div>
    `;
      return div;
    }
    return null;
  }

  handleClickNext(event) {
    event.preventDefault();
    this.index = 0;
    const nameSender = this.currentForm.querySelector('#name-sender');
    if (
      !(
        Formulario.validarCPF(Formulario.formatarCPF(this.cpfInput.value)) ||
        Formulario.validarCNPJ(Formulario.formatarCNPJ(this.cpfInput.value))
      )
    ) {
      alert('CPF/CNPJ inválido!');
      this.cpfInput.focus();
      return;
    }

    if (nameSender.value.length < 3) {
      alert('Nome inválido!');
      return;
    }

    if (!Formulario.validarEmail(this.email.value)) {
      alert('Email inválido!');
      this.email.focus();
      return;
    }

    if (!Formulario.validarTelefone(this.cel[this.index].value)) {
      alert('Insira um telefone válido');
      return;
    }

    if (nameSender.value.length < 3) {
      alert('Nome de destinatário ou remetente inválido!');
      return;
    }

    if (this.index <= this.form.length - 1) {
      this.index = 0;
      this.index += 1;
      // this.form.forEach((item) => item.classList.remove(this.activeClass));
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }
      this.currentForm = this.form.children[this.index];
      this.currentForm.classList.add(this.activeClass);

      this.nav.forEach((item) => item.classList.remove(this.activeClass));
      this.currentNav = this.nav[this.index];
      this.currentNav.classList.add(this.activeClass);

      console.log(this.form);

      if (this.index === this.form.children.length - 1) {
        this.form.addEventListener('submit', this.handleSubmit);
      }
    }

    this.addEventListeners();
  }

  handleClickPrev(event) {
    event.preventDefault();
    if (this.index >= 0) {
      this.index -= 1;
      console.log(this.index);
      const { children } = this.form;
      for (let i = 0; i < children.length; i += 1) {
        const item = children[i];
        item.classList.remove(this.activeClass);
      }
      this.currentForm = this.form.children[this.index];
      this.currentForm.classList.add(this.activeClass);

      this.nav.forEach((item) => item.classList.remove(this.activeClass));
      this.currentNav = this.nav[this.index];
      this.currentNav.classList.add(this.activeClass);
    }
  }

  formatarCPForCPNJ(value) {
    let CpfCnpj = value;
    if (CpfCnpj.length > 18) {
      CpfCnpj = value.slice(0, 18);
    }

    if (CpfCnpj.length <= 14) {
      this.cpfInput.value = Formulario.formatarCPF(CpfCnpj);
      if (Formulario.validarCPF(Formulario.formatarCPF(CpfCnpj))) {
        this.cpfInput.classList.remove('erro');
      } else {
        this.cpfInput.classList.add('erro');
      }
    } else {
      this.cpfInput.value = Formulario.formatarCNPJ(CpfCnpj);
      if (Formulario.validarCNPJ(Formulario.formatarCNPJ(CpfCnpj))) {
        this.cpfInput.classList.remove('erro');
      } else {
        this.cpfInput.classList.add('erro');
      }
    }
  }

  limparInput() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach((item) => {
      const input = item;
      input.value = '';
    });
  }

  addEventListeners() {
    this.proximo.addEventListener('click', this.handleClickNext);
    this.anterior.addEventListener('click', this.handleClickPrev);

    this.citySender.addEventListener('change', this.fetchProduct);

    this.cityRecipient.addEventListener('change', this.fetchProduct);

    this.cpfInput.addEventListener('input', () => {
      this.formatarCPForCPNJ(this.cpfInput.value);
    });

    this.cel.forEach((cel) => {
      cel.addEventListener('input', (event) => {
        const phone = cel;
        phone.value = Formulario.formatarTelefone(event.target.value);
      });
    });
  }

  init() {
    if (this.form) {
      this.addEventListeners();
      this.currentForm.classList.add(this.activeClass);
      this.currentNav.classList.add(this.activeClass);
    }
    return this;
  }
}

;// CONCATENATED MODULE: ./src/modules/Accordion.js
class Accordion {
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

;// CONCATENATED MODULE: ./src/modules/Tracking.js




class Tracking {
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

    const loading = Loading_loading();
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

;// CONCATENATED MODULE: ./src/index.js










const menuMobile = new FixedContainer(
  '#btn-menu-mobile',
  '.menu-mobile',
  '#btn-mobile-fechar',
);
menuMobile.init();

const proximo = new FormCarousel(
  '.cadastro-form form',
  '.btn.proximo',
  '.btn.anterior',
  '.cadastro-nav-item',
);
proximo.init();


new Tracking().init();

const containerTermos = new FixedContainer(
  '#abrir-termos',
  '[data-termos]',
  '#btn-termos-fechar',
);
containerTermos.init();

const simularValor = new SimularValores(
  '#btn-consultar-valor',
  "[data-form='simular-valor']",
  "[data-form='simular-valor']",
);
simularValor.init();

const headersContato = { 'Content-Type': 'application/json' };
const enviarContato = new Formulario(
  '#enviar-contato',
  "[data-form='contato']",
  'https://jsonplaceholder.typicode.com/posts',
  'POST',
  headersContato,
);
enviarContato.init();

const navFixed = new NavFixed('.navegacao-bg');
navFixed.init();

const anime = new SlideIn('[data-anime]');
anime.init();

const accordion = new Accordion('[data-accordion] dt');
accordion.init();


/******/ })()
;