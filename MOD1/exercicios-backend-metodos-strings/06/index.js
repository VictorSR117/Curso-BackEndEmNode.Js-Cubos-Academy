const celular = 7199918888;

let numeroString = celular.toString();
let tamanhoNumero = numeroString.length;

if (tamanhoNumero === 10) {
    let ddd = numeroString.slice(0, 2);
    let part1 = numeroString.slice(2, 6);
    let part2 = numeroString.slice(6);
    console.log(`(${ddd}) 9 ${part1}-${part2}`);
} 
else if (tamanhoNumero === 8) {
    let part1 = numeroString.slice(0, 4);
    let part2 = numeroString.slice(4);
    console.log(`9 ${part1}-${part2}`);
} 
else return "Número de celular inválido.";