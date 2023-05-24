class Modal {
  constructor(){
    this.injectHTML() // moramo injectovati html pre nego sto bilo koji js krene da interaguje sa tim html-om
    this.modal = document.querySelector(".modal") // ceo modalni prozor
    this.closeIcon = document.querySelector(".modal__close") // x koji zatvara modalni prozor
    // this.openModalButtons = document.querySelectorAll(".open-modal") // ima vise (tri) dugmica u index.html koji ispaljuju modalni prozor i svi imaju klasu open-modal
    this.events()
  }
 
  events(){
    // listen for open click
    // this.openModalButtons.forEach(el => el.addEventListener('click', e => this.openTheModal(e))) // za svako dugme vezi listener koji na klik poziva openTheModal metodu

    // listen for close click
    this.closeIcon.addEventListener("click", () => this.closeTheModal())

    // pushes any key - slusamo otpustanje ESC keya koje kad se pritisne i otpusti treba da zatvori modalni prozor
    document.addEventListener("keyup", e => this.keyPressHandler(e)) 
  }
  /*
  openTheModal(e){
    e.preventDefault(); // default behavior je da kad se klikne na dugme (dugme je a element koji ima default behavior) da se doda # na url i da se stranica skroluje na vrh sto necemo da se desi
    this.modal.classList.add("modal--is-visible") // dodaj klasu
  }
*/
  openTheModal(){
    this.modal.classList.add("modal--is-visible") // dodaj klasu
  }

  closeTheModal(){ // ne moramo imati e.preventDefault() jer X nije a element i nema default behavior
    this.modal.classList.remove("modal--is-visible") // skloni klasu
  }

  keyPressHandler(e){
    if(e.keyCode == 27) // samo ako je pritisnuto ESC dugme a kod za ESC je 27 
      this.closeTheModal()
  }

  injectHTML(){
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal">
        <div class="modal__inner">
          <h2 class="section-title section-title--blue section-title--less-margin">
            <img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong>
          </h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
          </div>

          <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
          </div>
        </div>
        <div class="modal__close">X</div>
      </div>
    `)
  }
}

export default Modal