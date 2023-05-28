import Axios from 'axios'

class ClientArea {
  constructor(){
    this.injectHTML()
    this.form = document.querySelector('.client-area__form')
    this.field = document.querySelector('.client-area__input')
    this.contentArea = document.querySelector('.client-area__content-area') // u client-area__content-area hocemo da ispisemo odgovor sa bekenda tj. sa cloud fje secret-area.js
    this.events()
  }

  events(){
    this.form.addEventListener('submit', e => {
      e.preventDefault() // po html defaultu kad se submituje forma desi se page refresh a mi to ne zelimo posle popunjavanja forme i klika na dugme submit
      this.sendRequest() // mi hocemo da pozovemo metodu sendRequest koja ce komunicirati sa bekendom tj. sa cloud fjom
    })
  }

  sendRequest(){ // koristicemo axios biblioteku za slanje html requesta na server preko background threada
    Axios.post('https://tourmaline-pika-8c0139.netlify.app/.netlify/functions/secret-area', {password: this.field.value})
      .then(response => {
        this.form.remove() // vizuelno skloni formu
        this.contentArea.innerHTML = response.data // response.data je ono sto stize sa bekenda
      })  // ako sve prodje po planu
      .catch(() => {
        this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again</p>`
        this.field.value = '' // isprazni polje za unos
        this.field.focus()
      }) // ako ne prodje po planu
  }

  injectHTML(){ // ova fja ce generisati html na dnu index.html stranice (formu) koji ce poslati na bekend (na cloud fju secret-area.js) podatak
    document.body.insertAdjacentHTML('beforeend', `
    <div class="client-area">
      <div class="wrapper wrapper--medium">
        <h2 class="section-title section-title--blue">Secret Client Area</h2>
        <form class="client-area__form" action="">
          <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
          <button class="btn btn--orange">Submit</button>
        </form>
        <div class="client-area__content-area"></div> 
      </div>
    </div>
    `) // u client-area__content-area hocemo da ispisemo odgovor sa bekenda tj. sa cloud fje secret-area.js
  }
}

export default ClientArea