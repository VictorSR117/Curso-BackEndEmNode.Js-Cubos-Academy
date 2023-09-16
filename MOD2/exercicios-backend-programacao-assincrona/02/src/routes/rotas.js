const express = require('express');
const controlers = require('../controlers/pokemon')
const router = express.Router();

router.get('/', controlers.listPokemons);
router.get('/:idpokemon', controlers.detailPokemon);

module.exports = router;