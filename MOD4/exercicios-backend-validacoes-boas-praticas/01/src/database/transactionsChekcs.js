const dataBaseManipulations = require("../utils/connectionDB");

const createANewTransaction = async (tipo, descricao, valor, data, categoria_id, usuario_id) => {
    return await dataBaseManipulations('transacoes').insert(
        {
            tipo,
            descricao,
            valor,
            data,
            categoria_id,
            usuario_id
        }
    ).first().returning('id');
}

const searchnewTransactionDataInDb = async (id, TransactionId) => {
    return await dataBaseManipulations('transacoes as t')
        .select('t.*', 'c.descricao as categoria_nome')
        .join('categorias as c', 't.categoria_id', 'c.id')
        .where('t.usuario_id', id)
        .andWhere('t.id', TransactionId)
        .first();
}

const listAllUserTransactionsAndOrderByCategoryIfNecessary = async (id, filtro) => {
    let query = dataBaseManipulations.select('t.*', 'c.descricao as categoria_nome')
        .from('transacoes as t')
        .join('categorias as c', 't.categoria_id', 'c.id')
        .where('t.usuario_id', id);

    if (filtro) query = query.andWhere('c.descricao', filtro);

    return query;
}

const listATransactionByIdAnduserId = async (transactionId, userId) => {
    return await dataBaseManipulations("transacoes")
        .select('*')
        .where('id', transactionId)
        .andWhere('usuario_id', userId);
}

const listOneUserTransactionById = async (id, transactionId) => {
    return await dataBaseManipulations.select('t.*', 'c.descricao as categoria_nome')
        .from('transacoes as t')
        .join('categorias as c', 't.categoria_id', 'c.id')
        .where('t.usuario_id', id)
        .andWhere('t.id', transactionId);
}

const listTheSumOfTheEntriesToUser = async id => {
    return await dataBaseManipulations("transacoes")
        .sum('valor')
        .where('usuario_id', id)
        .andWhere('tipo', 'entrada').first();
}

const listTheSumOfTheExitsToUser = async id => {
    return await dataBaseManipulations("transacoes")
        .sum('valor')
        .where('usuario_id', id)
        .andWhere('tipo', 'saida').first();
}

const formatTheMoneyCentsInBrazilianReais = totalSumOfValue => (typeof totalSumOfValue === 'object') ? 0 : parseFloat((Math.ceil(totalSumOfValue / 100 * 100) / 100).toFixed(2));

const updateATransaction = async (id, descricao, valor, data, categoria_id, tipo) => {
    return await dataBaseManipulations("transacoes")
        .where(id)
        .update({
            descricao,
            valor,
            data,
            categoria_id,
            tipo
        });
}

module.exports = {
    createANewTransaction,
    searchnewTransactionDataInDb,
    listAllUserTransactionsAndOrderByCategoryIfNecessary,
    listOneUserTransactionById,
    listATransactionByIdAnduserId,
    listTheSumOfTheEntriesToUser,
    listTheSumOfTheExitsToUser,
    formatTheMoneyCentsInBrazilianReais,
    updateATransaction
}