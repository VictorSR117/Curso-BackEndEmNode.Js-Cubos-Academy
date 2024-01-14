const knex = require('../conexao');

const validatesAllFieldsToLogin = async (req, res, next) => {
    const { nome, email } = req.body;

    if (!nome || !email) return res.status(400).json({ msg: "todos os campos são necessários" })
    next();
}

const validatesExistenceOfUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await knex('usuarios').where({ email });
        if (user.length > 0) return res.status(400).json("O email já existe");

        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ mensagem: 'erro interno do servidor' });
    }
}

module.exports = {
    validatesAllFieldsToLogin,
    validatesExistenceOfUser
};