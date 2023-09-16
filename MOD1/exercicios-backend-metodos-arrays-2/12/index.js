const pessoas = [
    {
        nome: "Antonio",
        idade: 30,
        profissao: "Jornalista",
    },
    {
        nome: "Maria",
        idade: 30,
        profissao: "Jornalista",
    },
    {
        nome: "Ana",
        idade: 21,
        profissao: "Programador",
    },
    {
        nome: "Beatriz",
        idade: 20,
        profissao: "Programador",
    },
    {
        nome: "José",
        idade: 32,
        profissao: "Jornalista",
    },
    {
        nome: "Marcos",
        idade: 30,
        profissao: "Programador",
    },
];

let programersBigger20Years = pessoas.filter(people => people.profissao === "Programador" && people.idade > 20);
let journalistBigger30Years = pessoas.filter(people => people.profissao === "Jornalista" && people.idade > 30);
let journalistAndProgramersTeens = pessoas.filter(people => (people.profissao === "Jornalista" || people.profissao === "Programador") && people.idade > 0 && people.idade <= 29);

console.log(programersBigger20Years);
console.log(journalistBigger30Years);
console.log(journalistAndProgramersTeens); 