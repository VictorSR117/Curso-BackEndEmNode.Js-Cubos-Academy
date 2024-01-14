const dataBaseManipulations = require('../utils/connectionDB');

const listOneRegisterById = async (tableName, id) => await dataBaseManipulations(tableName).where({ id }).first();

const listAllRegisters = async (tableName) => await dataBaseManipulations(tableName);

const deleteOneRegisterById = async (tableName, id) => {
    await dataBaseManipulations(tableName)
        .where(id)
        .del();
}

module.exports = {
    listAllRegisters,
    listOneRegisterById,
    deleteOneRegisterById
}