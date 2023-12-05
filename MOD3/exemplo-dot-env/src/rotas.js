const express = require('express');

const rotas = express.Router();

rotas.get('/', (req, res) => { res.send("poii") })

module.exports = rotas;