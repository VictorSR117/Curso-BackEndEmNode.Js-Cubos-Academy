const cidades = [
    "Salvador",
    "São Paulo",
    "Brasilia",
    "Recife",
    "Rio de Janeiro",
];
console.log(cidades.reduce((recordValue, currentValue) => currentValue.length > recordValue.length ? currentValue : recordValue));