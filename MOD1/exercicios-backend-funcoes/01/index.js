const prova = {
    aluno: "João",
    materia: "Português",
    valor: 10,
    questoes: [
        {
            resposta: "a",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        },
        {
            resposta: "e",
            correta: "b"
        },
        {
            resposta: "b",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        }
    ]
};

corrigirProva = (prova) => {
    let pontuacao = prova.valor / prova.questoes.length;
    let acertos = 0;
    prova.questoes.forEach(element => element.resposta === element.correta ? acertos++ : acertos);
    let nota = acertos * pontuacao;
    console.log(`O aluno(a) ${prova.aluno} acertou ${acertos} questões e obteve nota ${nota}`);
};

corrigirProva(prova);