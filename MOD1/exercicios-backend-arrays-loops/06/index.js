const numeros = [3, 4, 7, 8, 1, 6, 5, 10];
let sum = 0;

for (let index = 0; index < numeros.length; index++) numeros[index] % 2 === 0 ? sum += numeros[index] : false;

console.log(sum);