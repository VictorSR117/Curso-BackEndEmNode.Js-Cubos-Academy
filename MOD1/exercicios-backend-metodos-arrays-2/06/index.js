const cidades = [
    "Salvador",
    "São Paulo",
    "Brasilia",
    "Recife",
    "Rio de Janeiro",
];

let citysFiltered = cidades.filter(city => city.length < 8+1)

console.log(citysFiltered);