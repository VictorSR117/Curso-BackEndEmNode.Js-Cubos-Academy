const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { listAUserPasswordByEmail, listOneUserByEmail } = require('../../../database/userChecks');

const authenticateUserPassword = async (request, response, next) => {
    const { email, senha } = request.body;

    try {
        if (!email || !senha) return response.status(400).json({ mensagem: "Credenciais incompletas" });

        const result = await listAUserPasswordByEmail(email);
        if (result.length === 0) return response.status(400).json({ mensagem: "Usuário não encontrado" });

        const userPasswordHash = result.senha;
        const validPassword = await bcrypt.compare(senha, userPasswordHash);

        if (!validPassword) return response.status(400).json({ mensagem: "Credenciais inválidas" });

        next();
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const generateOneTokenForTheUser = async (request, response) => {
    const { email } = request.body;

    try {
        let existentUser = await listOneUserByEmail("usuarios", email);
        if (!existentUser) return response.status(404).json({ mensagem: "Usuário não encontrado" });

        const token = jwt.sign({ id: existentUser.id }, process.env.SECRET_KEY, { expiresIn: "8h" });
        const { senha: _, ...loggedUser } = existentUser;

        return response.status(200).json({ usuario: loggedUser, token });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = { authenticateUserPassword, generateOneTokenForTheUser };