const express = require('express');
const autenticacao = require('./intermediarios/autenticacao');
const alunosControlador = require('./controladores/alunos');

const roteador = express.Router();

roteador.use(autenticacao);

roteador.get('/', alunosControlador.getAlunos);
roteador.get('/:id', alunosControlador.getAlunoPorId);
roteador.post('/', alunosControlador.criarAluno);
roteador.delete('/:id', alunosControlador.excluirAluno);

module.exports = roteador;
