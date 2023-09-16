const original = [5, 7, 13, 17, 26, 34, 118, 245];
let aux = [];

let numbers = original.filter(element => { element >= 10 && element <= 20 || element > 100 ? aux.push(element) : false; return aux; });

console.log(aux);