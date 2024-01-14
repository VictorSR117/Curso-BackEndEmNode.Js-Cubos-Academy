const dataBaseManipulations = require('../utils/connectionDB');

const listAUserPasswordByEmail = async email => await dataBaseManipulations('usuarios').select('senha').where({ email }).first();

const listOneUserByEmail = async (tableName, email) => await dataBaseManipulations(tableName).where({ email }).first();

const createANewUser = async (nome, email, cryptographPassword) => await dataBaseManipulations('usuarios').insert({ nome, email, senha: cryptographPassword }).returning('*').first();

const updateUserbyId = async (id, nome, email, senha) => await dataBaseManipulations("usuarios").where({ id }).update({ nome, email, senha });

module.exports = {
    listAUserPasswordByEmail,
    createANewUser,
    listOneUserByEmail,
    updateUserbyId
}