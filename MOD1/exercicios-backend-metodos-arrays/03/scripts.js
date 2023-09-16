const nomes = ['Ford Ká', 'Ranger', 'Hilux', 'Corola', 'Fusca', 'Chevete', 'Brasilia'];
const posicao = 3;

getCars = (names, position) => console.log(names.slice(position, (position + 3)).join(" - "));

getCars(nomes, posicao)