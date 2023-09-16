const usuarios = [
    {
        nome: "João",
        pets: [],
    },
    {
        nome: "Ana",
        pets: ["Pingo", "Lulu"],
    },
    {
        nome: "Beatriz",
        pets: ["Lessie"],
    },
    {
        nome: "Carlos",
        pets: ["Farofa", "Salsicha", "Batata"],
    },
    {
        nome: "Antonio",
        pets: ["Naninha"],
    },
];

usuarios.forEach(element => element.pets.length ? element.pets.length > 1 ? console.log(`Sou ${element.nome} e tenho ${element.pets.length} pets.`) : console.log(`Sou ${element.nome} e tenho ${element.pets.length} pet.`) : console.log(`Sou ${element.nome} e não tenho pets.`));