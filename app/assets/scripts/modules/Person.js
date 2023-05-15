/*
function Person(fullName, favColor) { // construction function
  this.name = fullName;
  this.favoriteColor = favColor;
  this.greet = function() {console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);}
}
*/

// class syntax - moderniji nacin od construction function
class Person {
  constructor(name, favoriteColor){
    this.name = name;
    this.favoriteColor = favoriteColor;
  }
  greet(){
    console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor);
  }
}



export default Person