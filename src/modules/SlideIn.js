export default class SlideIn{
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