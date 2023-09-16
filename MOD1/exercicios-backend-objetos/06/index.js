const usuarios = [
    {
        nome: "João",
        idade: 25,
    },
    {
        nome: "Ana",
        idade: 18,
    },
    {
        nome: "Beatriz",
        idade: 15,
    },
    {
        nome: "Carlos",
        idade: 16,
    },
    {
        nome: "Antonio",
        idade: 32,
    },
];

let jovens = [];
let adultos = [];

usuarios.forEach(e => e.idade < 18 ? jovens.push(e) : adultos.push(e));

console.log(jovens);
console.log(adultos);