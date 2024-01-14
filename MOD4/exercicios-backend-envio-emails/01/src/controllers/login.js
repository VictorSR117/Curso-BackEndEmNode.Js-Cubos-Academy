const knex = require('../conexao');

const registerOneNewUser = async (req, res) => {
    const { nome, email } = req.body;

    newUser = { nome, email }
    const user = await knex('usuarios').insert(newUser).returning(['nome', 'email']);
    if (!user) return res.status(400).json("O usuário não foi cadastrado.");

    return res.status(201).json({ msg: "user cadastrado com sucesso" });
}

const loginOneUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await knex('usuarios').where({ email }).first();
        if (!user) return res.status(400).json("O usuario não foi encontrado");

        res.status(200).json({ msg: "usuário logado com sucesso" });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

const listAllUsers = async (req, res) => {
    const allUsers = await knex('usuarios');
    if (!allUsers) return res.status(400).json("Nenhum usuário cadastrado!");
    return res.status(200).json(allUsers);
}

module.exports = { registerOneNewUser, loginOneUser, listAllUsers }