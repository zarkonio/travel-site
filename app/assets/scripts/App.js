import '../styles/styles.css';
// import Person from './modules/Person';  // .js nije neophodno
import MobileMenu from './modules/MobileMenu'; // .js nije neophodno

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

let mobileMenu = new MobileMenu();



