const express = require('express');
const categoryRouter = express.Router();

const listAllCategories = require('../controllers/categories');

categoryRouter.get('/categoria', listAllCategories);

module.exports = categoryRouter;