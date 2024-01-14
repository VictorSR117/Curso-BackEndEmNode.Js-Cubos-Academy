const express = require('express');
const transactionsRouter = express.Router();

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

transactionsRouter.get('/transacao', listAllUserTransactions);
transactionsRouter.post('/transacao', contentValidation, createATransactionForTheUser);
transactionsRouter.put('/transacao/:id', validatingTheUserId, contentValidation, updateTransaction);
transactionsRouter.get('/transacao/extrato', presentTheUserEntryAndExitStatement);
transactionsRouter.get('/transacao/:id', validatingTheUserId, listAUserTransaction);
transactionsRouter.delete('/transacao/:id', validatingTheUserId, deleteAUserTransaction);

module.exports = transactionsRouter;