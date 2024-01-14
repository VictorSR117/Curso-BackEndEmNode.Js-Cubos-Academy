const { listOneRegisterById } = require("../../database/genericChekcs");
const joi = require('joi');

const contentValidation = schemaValidation => async (request, response, next) => {
    const { descricao, valor, data, categoria_id, tipo } = request.body;

    if (tipo !== "entrada" && tipo !== "saida") return response.status(400).json({ mensagem: "O campo 'tipo' deve ser 'entrada' ou 'saida'." });

    await transactionSchema.validateAsync(request.body);

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(data)) return response.status(400).json({ mensagem: "O campo 'data' deve estar no formato ano mês dia 'yyyy-MM-dd'." });

    const result = await listOneRegisterById("categorias", categoria_id);
    if (!result) return response.status(400).json({ mensagem: "Categoria não encontrada" });

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