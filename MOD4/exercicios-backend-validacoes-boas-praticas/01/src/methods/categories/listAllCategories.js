const dataBaseManipulations = require("../../utils/connectionDB");
const criptographPAssword = require("../users/criptographPAssword");

const searchCategoryDataInDb = async (request, response) => {
    try {
        return response.json(await dataBaseManipulations('categorias'));
    }
    catch (error) {
        response.status(500).json({ mensagem: "Erro Interno do Servidor" })
        console.error(error.message);
    }
}

module.exports = searchCategoryDataInDb;