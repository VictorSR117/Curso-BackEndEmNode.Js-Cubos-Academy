const pool = require("../../utils/connectionDB");

const contentValidation = async (request, response, next) => {
    const { descricao, valor, data, categoria_id, tipo } = request.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) return response.status(400).json({ mensagem: "todos os campos devem ser preenchidos" });
    if (tipo !== "entrada" && tipo !== "saida") return response.status(400).json({ mensagem: "O campo 'tipo' deve ser 'entrada' ou 'saida'." });

    parseInt(valor)
    if (!Number.isInteger(valor)) return response.status(400).json({ mensagem: "O campo 'valor' deve ser um número inteiro em centavos, sem vírgulas" });

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(data)) return response.status(400).json({ mensagem: "O campo 'data' deve estar no formato ano mês dia 'yyyy-MM-dd'." });

    const { rowCount } = await pool.query("SELECT * FROM categorias WHERE id = $1", [categoria_id]);
    if (rowCount < 1) return response.status(400).json({ mensagem: "Categoria não encontrada" });

    next();
}

const validatingTheUserId = (request, response, next) => {
    const { id } = request.params;
    (isNaN(id)) ? response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' }) : next();
}

module.exports = {
    contentValidation,
    validatingTheUserId
};