const pool = require('../utils/connectionDB');

const listAllCategories = async (request, response) => {
    try {
        let allCategories = await pool.query("SELECT * FROM categorias");
        return response.json(allCategories.rows);
    }
    catch (error) {
        response.status(500).json({ mensagem: "Erro Interno do Servidor" })
        console.error(error.message);
    }
}

module.exports = listAllCategories;