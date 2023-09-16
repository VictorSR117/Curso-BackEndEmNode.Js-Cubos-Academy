const express = require('express');
const controlers = require('../controlers/convidados')
const router = express.Router();

router.get('/', controlers.listarConvidados);
router.post('/', controlers.adicinarConvidado);
router.delete('/:nome', controlers.excluirConvidado);

module.exports = router;