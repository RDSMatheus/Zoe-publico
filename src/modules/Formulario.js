import fetchDados from './fetchDados';

export default class Formulario {
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

    if (this.method === ('GET' || 'HEAD')) {
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
