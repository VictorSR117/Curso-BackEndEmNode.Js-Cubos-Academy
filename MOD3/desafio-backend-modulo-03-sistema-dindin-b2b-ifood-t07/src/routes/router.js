const express = require('express');
const router = express.Router();

const {
    validationsFromTextForUserRegistration,
    validationsFromTextForUserLogin,
} = require('../middlewares/users/validations');

const {
    authenticateUserPassword,
    generateOneTokenForTheUser
} = require('../middlewares/users/sso/authentication');

const verifyIfUserIsLogged = require('../middlewares/users/login');

const {
    registerOneNewUser,
    verifyUserLogin,
    updateUser
} = require('../controllers/users');

const listAllCategories = require('../controllers/categories');

const {
    listAllUserTransactions,
    listAUserTransaction,
    presentTheUserEntryAndExitStatement,
    deleteAUserTransaction,
    createATransactionForTheUser,
    updateTransaction
} = require('../controllers/transactions');

const {
    validatingTheUserId, contentValidation
} = require('../middlewares/transactions/validations');

router.post('/usuario', validationsFromTextForUserRegistration, registerOneNewUser);
router.post('/login', validationsFromTextForUserLogin, authenticateUserPassword, generateOneTokenForTheUser);

router.use(verifyIfUserIsLogged);

router.get('/usuario', verifyUserLogin);
router.put('/usuario', updateUser);

router.get('/categoria', listAllCategories);

router.get('/transacao', listAllUserTransactions);
router.post('/transacao', contentValidation, createATransactionForTheUser);
router.put('/transacao/:id', validatingTheUserId, updateTransaction);
router.get('/transacao/extrato', presentTheUserEntryAndExitStatement);
router.get('/transacao/:id', validatingTheUserId, listAUserTransaction);
router.delete('/transacao/:id', validatingTheUserId, deleteAUserTransaction);

module.exports = router;