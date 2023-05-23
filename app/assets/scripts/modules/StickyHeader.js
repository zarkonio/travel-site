import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce' // debounce je mogucnost da dobijemo novu visinu prozora tako sto se taj novi podatak dobije nakon resize od strane korisnika nakon xxx milisekundi. Sustina je usteda procesora tokom korisnikove manipulacije dimenzijama prozora browsera

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
    this.pageSections = document.querySelectorAll(".page-section") // page section elementi index.html stranice
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    this.events()
  }

  events(){
    window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200)) // svakih 200ms tj. 5 puta u minuta pozvace se metoda runOnScroll

    window.addEventListener("resize", debounce(() => { // ukoliko korisnik resizuje velicinu prozora daj mi novi podatak tj. novu visinu vidljivih unutr dim prozora browsera
      // console.log('resize')
      this.browserHeight = window.innerHeight
    }, 333)) // 333 milisekundi posle korisnikovog resizovanja prozora browsera
  }

  runOnScroll(){
    this.determineScrollDirection()
    if(window.scrollY > 60){ // ako smo skrolovali 60 ili vise pixela od vrha unutrasnjosti browsera
      this.siteHeader.classList.add('site-header--dark') // dodaj ovu klasu u CSS
    } else {
      this.siteHeader.classList.remove('site-header--dark') // skloni ovu klasu iz CSS
    }

    this.pageSections.forEach(el => this.calcSection(el))
  }

  determineScrollDirection(){
    if(window.scrollY > this.previousScrollY){
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }
    this.previousScrollY = window.scrollY
  }

  calcSection(el){
    if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
      let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
      console.log(`scrollPercent = ${scrollPercent}`);
      if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
        let matchingLink = el.getAttribute("data-matching-link") // daj mi element na osnovu atributa iz html-a
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
        document.querySelector(matchingLink).classList.add("is-current-link")
      }
    }
  }

}

export default StickyHeader;