const express = require('express');
const controlers = require('../controlers/carros')
const router = express.Router();

router.get('/', controlers.listCar);
router.post('/', controlers.addCar);
router.put('/:id', controlers.changeCar);
router.patch('/:id', controlers.updateCar);
router.delete('/:id', controlers.deleteCar);

module.exports = router;