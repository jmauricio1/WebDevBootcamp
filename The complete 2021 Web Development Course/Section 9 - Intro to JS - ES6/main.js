//alert("Hello World");

//typeof checks the type of the given parameter
console.log(typeof("chicken"));

//setting a prompt and retrieving information
/*
var a = prompt("What is your name?");
console.log("Hello " + a);
*/


/*
test();

function test(){
    var a = "3";
    var b = "8";

    var c = b;
    b = a;
    a = c;

    console.log("a is " + a);
    console.log("b is " + b);
}

*/

/*
var thingy = prompt("tweet here");
thingy = thingy.slice(0, 140);
console.log(thingy.length + '\n' + thingy);
*/

/*
var user = prompt("What is your name?");
var userFirst = user.slice(0, 1).toUpperCase() + user.slice(1, user.length).toLowerCase();
alert("Hello, " + userFinal);
*/

function bmiCalculator(weight, height){

    //There's a difference between this --> 3
    console.log(height^2);

    //And this --> 3.24
    console.log(height * height);

    //But for powers, use Math.pow()
    console.log(Math.pow(height, 2));
    
    return weight / (height * height);
}

console.log(bmiCalculator(65, 1.8));