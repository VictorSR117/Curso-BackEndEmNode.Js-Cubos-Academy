const usuarios = [
    {
        nome: "João",
        pets: ["Max"],
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

findOwner = usuarios => {
    petSearch = "Max";
    let breaker = true;

    usuarios.forEach(element => {
        element.pets.forEach(e => {
            if (e === petSearch) {
                console.log(`O dono(a) do(a) ${petSearch} é o(a) ${element.nome}`);
                breaker = false;
            }
            else {""}
        });
    });

    if (breaker) console.log(`Que pena ${petSearch}, não encontramos seu dono(a)`);
}
findOwner(usuarios);