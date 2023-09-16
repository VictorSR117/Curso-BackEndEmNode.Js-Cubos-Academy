const express = require('express');
const roteador = require('./roteador');
const app = express();

app.use(express.json());
app.use('/alunos', roteador);

app.listen(3000);