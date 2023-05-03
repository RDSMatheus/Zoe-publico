import FixedContainer from './modules/FixedContainer';
import NavFixed from './modules/NavFixed';
import SlideIn from './modules/SlideIn';
import SimularValor from './modules/SimularValor';
import Formulario from './modules/Formulario';
import FormCarousel from './modules/Carousel';
import Accordion from './modules/Accordion';
import Tracking from './modules/Tracking';
import './style.css';

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

const simularValor = new SimularValor(
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

