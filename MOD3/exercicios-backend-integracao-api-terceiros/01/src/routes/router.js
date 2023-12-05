const express = require('express');
const listCompany = require('../controllers/companys');
const router = express.Router();

router.get('/empresas', listCompany);

module.exports = router;