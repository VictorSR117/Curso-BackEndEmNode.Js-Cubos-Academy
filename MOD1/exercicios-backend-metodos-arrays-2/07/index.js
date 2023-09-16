const endereços = [
    { cep: "00111222", rua: "Rua dos Artistas" },
    { cep: "00111333", rua: "Rua Augusta" },
    { cep: "00222444", rua: "Avenida Paralela" },
    { cep: "11222333", rua: "Rua Carlos Gomes" },
];

let cep = "00222444";

searchCEP = receivedCEP => {
    let enderecoEncontrado = endereços.find(element => element.cep === receivedCEP);
    enderecoEncontrado ? console.log(enderecoEncontrado.rua) : console.log("CEP não encontrado");
}

searchCEP(cep);