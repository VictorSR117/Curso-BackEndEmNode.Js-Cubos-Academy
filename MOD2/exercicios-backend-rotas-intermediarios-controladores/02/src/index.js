let express = require('express');
const app = express();

let jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let turno = 0;

app.get('/', (request, response) => {
    let jogadorAtual = jogadores[turno % jogadores.length];
    response.send(`É a vez de ${jogadorAtual} jogar!`);
    turno++;
});

app.get('/remover', (request, response) => {
    let index = parseInt(request.query.indice);

    if (isNaN(index) || index < 0 || index >= jogadores.length) return res.send(`O índice informado (${index}) não existe no array. Nenhum jogador foi removido.`);

    jogadores.splice(index, 1);
    turno = turno > index ? turno - 1 : turno;

    response.send(jogadores);
});

app.get('/adicionar', (request, response) => {
    const nome = request.query.nome;
    const indice = parseInt(request.query.indice);

    if (isNaN(indice)) jogadores.push(nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase());

    else {
        if (indice < 0 || indice > jogadores.length) return response.send(`O índice informado (${indice}) não é válido. Novo jogador não foi adicionado.`);
        jogadores.splice(indice, 0, nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase());
    }

    response.send(jogadores);
});

app.get('/listar', (request, response) => response.send(jogadores));

app.listen(8000);