const curso = {
    id: 1234,
    nome: "Lógica de programação",
    aulas: [],
}

curso.aulas.push({
    Identificador: 'Aula 01',
    Nome_da_aula: "Introdução a programação"
});
curso.aulas.push({
    Identificador: 'Aula 02',
    Nome_da_aula: "Variáveis"
});
curso.aulas.push({
    Identificador: 'Aula 03',
    Nome_da_aula: "Condicionais"
});
curso.aulas.push({
    Identificador: 'Aula 04',
    Nome_da_aula: "Arrays"
});

console.log(curso);