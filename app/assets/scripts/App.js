import '../styles/styles.css';
import 'lazysizes'
// import Person from './modules/Person';  // .js nije neophodno
import MobileMenu from './modules/MobileMenu'; // .js nije neophodno
import RevealOnScroll from './modules/RevealOnScroll'; // .js nije neophodno
import StickyHeader from './modules/StickyHeader'; // .js nije neophodno


// alert("Hello, this is just a testtmm");
if(module.hot){
  module.hot.accept() // ako ima smisla prihvati
}

/* Lesson example code below this line */

console.log("This is a test");
/*
function person(name, favColor){
  console.log('Hello my name is ' + name + ' and my favorite color is ' + favColor + '.');
}

let johnName = 'John Doe';
let johnFavColor = 'blue';

let john = {
  name: "John Doe",
  favoriteColor: "blue",
  greet: function(){ console.log("Hello, my name is " + john.name + " and my favorite color is " + john.favoriteColor); }
}

person(johnName, johnFavColor);
person(john.name, john.favoriteColor);
person('Jane Smith', 'green');
john.greet();
*/
/*
class Adult extends Person {
  payTaxes() { console.log(this.name + " now owes zero taxes.");}
}


let john = new Person("John Doe", 'purple');
john.greet();
john.name;

let jane = new Adult("Jane Smith", 'green');
jane.greet();
jane.payTaxes();
*/

// new Modal()

let stickyHeader = new StickyHeader()

let mobileMenu = new MobileMenu();
// let revealOnScroll = new RevealOnScroll();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75) // drugi arg je procenat skrolovanog sajta - na koliko % da krene fade-in efekat u odnosu na poziciju elemenata na stranici
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60) // instanciranje obj za razlicite iteme tj. elemente sajta koji treba na scroll da se pojave

let modal // modal je u pocetku undefined

document.querySelectorAll('.open-modal').forEach(el => { // ima vise (tri) dugmica u index.html koji ispaljuju modalni prozor i svi imaju klasu open-modal
  el.addEventListener('click', e => {   // za svako dugme koje ispaljuje modalni prozor vezi listener
    e.preventDefault()   // default behavior je da kad se klikne na dugme (dugme je a element koji ima default behavior) da se doda # na url i da se stranica skroluje na vrh sto necemo da se desi
    if(typeof modal == "undefined"){ // samo prvi put je modal undefined. ovo radimo jer ne zelimo vise objekata klase Modal ucitanih u memoriju
      import(/* webpackChunkName: "modal" */  './modules/Modal') // treba nam Modal.js samo u momentu klika na jedno od dugmica. Ovo ovako radimo da ne zagusimo sajt u momentu ucitavanja tj. posete vec da se sve ovo desi po potrebi tj. posle klika na dugme
      .then(x => {
        modal = new x.default() // instanciraj obj klase Modal
        setTimeout(() => modal.openTheModal(), 20) // prvo sacekaj 20 milisekundi pa onda pozovi openModal, cisto nek se prvo kreira obj i injectuje html u dom
      }) // ako je sve proslo ok
      .catch(() => console.log("There was a problem")) // ako je doslo do problema
    } else
      modal.openTheModal() // obj pozivu svoju metodu
  })
})

// webpackChunkName: "modal" znaci da se preimenuje bundle.js fajl u modal.bundle.js

