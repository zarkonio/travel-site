import throttle from 'lodash/throttle' // instalirali smo biblioteku sa npm install lodash - industrijski standard za throttle-ovanje. Sustina je usteda procesora tokom korisnikovog skrolovanja i racunanja pozicije gledajuci visinu
import debounce from 'lodash/debounce' // debounce je mogucnost da dobijemo novu visinu prozora tako sto se taj novi podatak dobije nakon resize od strane korisnika nakon xxx milisekundi. Sustina je usteda procesora tokom korisnikove manipulacije dimenzijama prozora browsera


class RevealOnScroll {
  constructor(els, thresholdPercent){ // konstruktor
    // this.itemsToReveal = document.querySelectorAll(".feature-item"); // niz od 4 itema u sekciji our-features
    this.itemsToReveal = els
    this.thresholdPercent = thresholdPercent
    this.browserHeight = window.innerHeight // izvlacimo ovo jednom kao podatak jer necemo da se iscitava milion puta ovaj podatak u toku scrolla tj. u metodi calculateIfScrolledTo
    this.hideInitially();  // inicijalno sakri sve iteme
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this) // pozovi svakih 200ms tj. 5 puta u sekundi calcCaller fju
    this.events();
  }

  events(){ // metoda klase. gde god je pozivamo pozivamo je sa this.njenNaziv
    window.addEventListener("scroll", this.scrollThrottle) // osluskujem svaki scroll na browseru i kad se desi pozivam fju scrollThrottle
    window.addEventListener("resize", debounce(() => { // ukoliko korisnik resizuje velicinu prozora daj mi novi podatak tj. novu visinu vidljivih unutr dim prozora browsera
      // console.log('resize')
      this.browserHeight = window.innerHeight
    }, 333)) // 333 milisekundi posle korisnikovog resizovanja prozora browsera
  }

  calcCaller(){  // metoda klase. gde god je pozivamo pozivamo je sa this.njenNaziv
    this.itemsToReveal.forEach(el => {
      if(el.isRevealed == false) // ako el tj. item iz sekcije "Our Features" nije prikazan to znaci da nije skrolovano do njega i da treba racunati scroll do njega da bi se el prvi put prikazao sa efektom nastajanja
        this.calculateIfScrolledTo(el);
    })
  }

  calculateIfScrolledTo(el){  // metoda klase. gde god je pozivamo pozivamo je sa this.njenNaziv
    //console.log("window.scrollY = " + window.scrollY); // koliko smo skrolovali ka dole u px od gornje unutr ivice browsera
    //console.log("window.innerHeight = " + window.innerHeight); // trenutna visina vidljivog unutrasnjeg browserovog prozora, uglavnom je fiksno osim ako korisnik ne menja velicinu prozora
    //console.log("el.offsetTop = " + el.offsetTop); // uvek je fiksno dok skrolujemo - udaljenost gornje vidljive ivice el od gornje unutr ivice browsera
    // jos bi bilo efikasnije da recimo 1s nakon ucitavanja celog sajta a posebno slika u varijable smestimo vrednosti el.offsetTop koje se vrv nece menjati
    // pa da u ovom if-u koristimo te varijable i te varijable menjamo samo pri promeni dim prozora browsera itd. umesto sto se el.offsetTop stalno racuna pri scrollu
    // console.log("---------------------------------------------------------");
    if(window.scrollY + this.browserHeight > el.offsetTop) { // ukoliko smo skrolovali do blizu elemenata koji treba da se pojave
      // console.log("poziv fje");
      // console.log(el.getBoundingClientRect().y); // ispisuje koliko je gornja ivica svakog od 4 itema udaljena u pixelima od gornje ivice unutrasnjosti browsera (viewporta)
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if(scrollPercent < this.thresholdPercent){
        el.classList.add("reveal-item--is-visible") // opacity postaje 1
        el.isRevealed = true
        if(el.isLastItem)   // ako je zadnji item true tj ako je i on prikazan, onda su prikazani svi itemi i mozemo prestati da osluskujemo scroll nad browserom
          window.removeEventListener("scroll", this.scrollThrottle)
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => { // inicijalno sakri sve iteme
      el.classList.add("reveal-item") // elementu (ima ih 4) sa klasom "feature-item" u css-u dodaj klasu "reveal-item" sa opacity: 0
      el.isRevealed = false; // el je svaki hidden u pocetku. posle kad bude prikazan njegov property isRevealed bice true pa necemo vise racunati scroll
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true // zadnjem el tj. objektu u nizu itemsToReveal dodaj property isLastItem = true
  }
}

export default RevealOnScroll;