const letras = ["A", "a", "B", "C", "E", "e"];
let count = 0;

let qtd = letras.filter(element => element === "e" || element === "E" ? count++ : false);
count ? console.log(`Foram encontradas ${count} letras "E" ou "e".`) : console.log(`Nenhuma letra "E" ou "e" foi encontrada.`);