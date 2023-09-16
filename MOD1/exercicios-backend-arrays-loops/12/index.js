const filaDeDentro = ["Jose", "Maria", "Joao"];
const filaDeFora = ["Joana", "Roberta", "Marcos", "Felipe"];
const LIMIT = 5;

while (filaDeFora.length > 0 && filaDeDentro.length < LIMIT) filaDeDentro.push(filaDeFora.shift());

console.log(filaDeDentro);
console.log(filaDeFora);