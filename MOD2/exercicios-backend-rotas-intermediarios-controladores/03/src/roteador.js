const express = require('express');
const { propertyListing, propertyListedById } = require('../src/controlers/imoveis');
const router = express();

router.get('/imoveis', propertyListing);
router.get('/imoveis/:id', propertyListedById);

module.exports = router