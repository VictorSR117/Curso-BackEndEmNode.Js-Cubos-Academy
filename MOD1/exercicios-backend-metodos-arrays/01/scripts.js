const frutas = ['Banana', 'Maçã', 'Abacaxi', 'Pêra', 'Uva'];

let fruitsReverse = frutas.reverse().join(", ")
frutas.reverse();
frutas.pop();
frutas.shift();
frutas.push("Melão");

console.log(fruitsReverse);
console.log(frutas);