const express = require('express');
const router = express.Router();
const { validatesAllFieldsToLogin, validatesExistenceOfUser } = require('../middlewares/login');
const { registerOneNewUser, loginOneUser, listAllUsers } = require('../controllers/login');
const sendEmailForTheUser = require('../controllers/sendEmail');

router.post('/cadastro', validatesAllFieldsToLogin, validatesExistenceOfUser, registerOneNewUser);
router.post('/login', validatesAllFieldsToLogin, loginOneUser);
router.get('/listar', listAllUsers);
router.post('/sendEmail', sendEmailForTheUser);

module.exports = router;