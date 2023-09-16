const express = require('express')
const { fullAdress } = require('../controllers/enderecos')
const router = express.Router();

router.get('/:cep', fullAdress)

module.exports = router;