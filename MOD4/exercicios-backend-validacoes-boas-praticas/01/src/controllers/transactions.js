const {
    createANewTransaction,
    listAllUserTransactionsAndOrderByCategoryIfNecessary,
    listOneUserTransactionById,
    listTheSumOfTheEntriesToUser,
    listTheSumOfTheExitsToUser,
    formatTheMoneyCentsInBrazilianReais,
    listATransactionByIdAnduserId,
    updateATransaction
} = require('../database/transactionsChekcs');

const formatDateAndValueOftransaction = require('../methods/transactions/formatDataAndTheValueOfTransactions');
const formatTheDataAndvaluesAndInsertInArray = require('../methods/transactions/formatAndInsertTheTransactionDataAndValue');
const formatTheToken = require('../methods/users/barerTokenFormat');
const validateUsablityToken = require('../methods/users/tokenValidation');
const verifyIfTransactionExistis = require('../methods/transactions/transactionNotFound');

const createATransactionForTheUser = async (request, response) => {
    const { tipo, descricao, valor, data, categoria_id } = request.body;
    const { authorization } = request.headers;

    const token = formatTheToken(authorization);

    try {

        const { id } = validateUsablityToken(token);

        const newTransaction = await createANewTransaction(tipo, descricao, valor, data, categoria_id, id);
        const newTransactionId = newTransaction.id;

        const detailsOfNewTransaction = await searchnewTransactionDataInDb(id, newTransactionId);
        const newTransactionFormatted = formatDateAndValueOftransaction(detailsOfNewTransaction)

        return response.status(201).json(newTransactionFormatted);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const listAllUserTransactions = async (request, response) => {
    const { authorization } = request.headers;
    const { filtro } = request.query;

    const token = formatTheToken(authorization);
    try {
        const { id } = validateUsablityToken(token);
        const transactionDetails = await listAllUserTransactionsAndOrderByCategoryIfNecessary(id, filtro);

        request.user = formatTheDataAndvaluesAndInsertInArray(transactionDetails);
        return response.json(request.user);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const listAUserTransaction = async (request, response) => {
    const { id } = request.params;
    const { authorization } = request.headers;

    const token = formatTheToken(authorization);
    let transactionId = id;

    try {
        const { id } = validateUsablityToken(token);

        const transactionSearch = await listOneUserTransactionById(id, transactionId);
        let transaction = await verifyIfTransactionExistis(transactionSearch, response);

        request.user = formatDateAndValueOftransaction(transaction);
        return response.json(request.user);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const deleteAUserTransaction = async (request, response) => {
    const { id } = request.params;
    const { authorization } = request.headers;

    const token = formatTheToken(authorization);
    let idTransaction = id;

    try {
        const { id } = validateUsablityToken(token);

        const ExistentTransaction = listATransactionByIdAnduserId(idTransaction, id)
        await verifyIfTransactionExistis(ExistentTransaction, response);

        await deleteOneRegisterById("transacoes", idTransaction);

        return response.status(204).json();
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const presentTheUserEntryAndExitStatement = async (request, response) => {
    const { authorization } = request.headers;

    const token = formatTheToken(authorization);

    try {
        const { id } = validateUsablityToken(token);
        const entrys = await listTheSumOfTheEntriesToUser(id);
        const exits = await listTheSumOfTheExitsToUser(id);

        let entrada = formatTheMoneyCentsInBrazilianReais(entrys.sum);
        let saida = formatTheMoneyCentsInBrazilianReais(exits.sum);

        return response.json({ entrada, saida });
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const updateTransaction = async (request, response) => {
    const { id } = request.params;
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const { authorization } = request.headers;
    const token = formatTheToken(authorization);

    try {
        const decodedToken = validateUsablityToken(token);
        const userId = decodedToken.id;

        let transaction = listATransactionByIdAnduserId(id, userId);
        await verifyIfTransactionExistis(transaction, response);

        await updateATransaction(id, descricao, valor, data, categoria_id, tipo);
        return response.status(204).send();
    }
    catch (error) {
        return response.status(500).json('Erro interno do servidor')
    }
}

module.exports = {
    createATransactionForTheUser,
    listAllUserTransactions,
    listAUserTransaction,
    deleteAUserTransaction,
    presentTheUserEntryAndExitStatement,
    updateTransaction
}