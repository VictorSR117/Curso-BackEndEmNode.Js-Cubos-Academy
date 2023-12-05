const express = require('express');
const { findAuthor, insertAuthor } = require('../controllers/autores');
const { insertBook, listBooks } = require('../controllers/livros');
const router = express.Router();

//listagem dos livros
router.get('/livro', listBooks);

//encontrar um autor
router.get('/autor/:id', findAuthor);

//inserir um autor
router.post('/autor', insertAuthor);

//inserir um livro
router.post('/autor/:id/livro', insertBook);

module.exports = router;