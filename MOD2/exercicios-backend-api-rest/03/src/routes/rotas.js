const express = require('express');
const controlers = require('../controlers/livros')
const router = express.Router();

router.get('/', controlers.listBook);
router.get('/:id', controlers.listBookPerID);
router.post('/', controlers.addBook);
router.put('/:id', controlers.changeBook);
router.patch('/:id', controlers.updateBook);
router.delete('/:id', controlers.deleteBook);

module.exports = router;