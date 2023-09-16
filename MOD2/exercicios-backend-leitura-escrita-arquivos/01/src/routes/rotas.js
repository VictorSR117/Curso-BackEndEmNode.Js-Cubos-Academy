const express = require('express');
const controlers = require('../controlers/produtos')
const router = express.Router();

router.get('/', controlers.listAllProducts);
router.get('/:idProduto', controlers.listOneProductPerID);
router.get('/:idProduto/frete/:cep', controlers.calculateProductShipping);

module.exports = router;