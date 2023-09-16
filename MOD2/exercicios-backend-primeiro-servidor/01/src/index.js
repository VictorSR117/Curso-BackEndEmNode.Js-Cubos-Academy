const express = require('express');

const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

app.get('/', (request, response) => {
    response.send(jogadores.forEach((element) => console.log(`É a vez de ${element} jogar!`)));
});

app.listen(3000);