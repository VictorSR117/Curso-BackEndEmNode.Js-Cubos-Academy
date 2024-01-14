const Joi = require('joi');

const transactionSchema = joi.object({
    descricao: joi.string().required(),
    valor: joi.number().integer().positive(),
    data: joi.date().required(),
    categoria_id: joi.number().positive().integer(),
    tipo: joi.string().required()
});