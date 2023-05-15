class MobileMenu {
  constructor(){
    this.menuIcon = document.querySelector(".site-header__menu-icon")
    this.menuContent = document.querySelector(".site-header__menu-content")
    this.siteHeader = document.querySelector(".site-header")
    this.events()
  }

  events(){
    this.menuIcon.addEventListener('click', () => this.toggleTheMenu()) // ne pisati: this.menuIcon.addEventListener('click', this.toggleTheMenu())
  }

  toggleTheMenu(){
    this.menuContent.classList.toggle("site-header__menu-content--is-visible"); // kad se klikne na hamburger menu u mobile rezimu
    this.siteHeader.classList.toggle("site-header--is-expanded"); // zatamnjivanje pozadine iza menija na mobile ekranu
    this.menuIcon.classList.toggle("site-header__menu-icon--close-x") 
  }
}


export default MobileMenu;