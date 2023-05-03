export default class NavFixed {
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
