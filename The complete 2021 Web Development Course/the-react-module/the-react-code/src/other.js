var numbers = [3, 56, 2, 48, 5];

//-------------------- MAP --------------------

function double(x){
    return x * 2;
}

//Map: Create a new array by doing something with each item in an array
//Just need to have the function name and no parameters when stating the argument in map
//The bottom two functions use map but still produce the same thing
const newMapArray = numbers.map(double);

const otherMapArray = numbers.map((x) => {
    return x * 2;
});
// console.log('new: ' + newMapArray);
// console.log('other: ' + otherMapArray);

//-------------------- FILTER --------------------

const newFilterArray = numbers.filter((x) => {
    return x > 10;
});

//console.log(newFilter);

//-------------------- REDUCE --------------------

const newReduceNum = numbers.reduce((x, y) => {
    return x + y;
});

//console.log(newReduceNum);

//-------------------- FIND --------------------

//This returns the first number that is larget than 10
const firstLargerThanTen = numbers.find((x) => {
    return x > 10;
});

//console.log(firstLargerThanTen);