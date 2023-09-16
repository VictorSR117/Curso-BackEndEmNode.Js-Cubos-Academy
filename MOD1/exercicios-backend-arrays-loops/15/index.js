const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = [];
const impares = [];

original.forEach(element => element % 2 == 0 ? pares.push(element) : impares.push(element));

console.log(pares);
console.log(impares);