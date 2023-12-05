const jwtPassword = require('../../../private/jwtPassword');
const pool = require('../../../utils/connectionDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUserPassword = async (request, response, next) => {
    const { email, senha } = request.body;

    try {
        if (!email || !senha) return response.status(400).json({ mensagem: "Credenciais incompletas" });

        const result = await pool.query("SELECT senha FROM usuarios WHERE email = $1", [email]);
        if (result.rows.length === 0) return response.status(400).json({ mensagem: "Usuário não encontrado" });

        const userPasswordHash = result.rows[0].senha;
        const validPassword = await bcrypt.compare(senha, userPasswordHash);

        if (!validPassword) return response.status(400).json({ mensagem: "Credenciais inválidas" });

        next();
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const generateOneTokenForTheUser = async (request, response) => {
    const { email } = request.body;

    try {
        let existentUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        const token = jwt.sign({ id: existentUser.rows[0].id }, jwtPassword, { expiresIn: "8h" });
        const { senha: _, ...loggedUser } = existentUser.rows[0];

        return response.status(200).json({ usuario: loggedUser, token });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'erro interno do servidor' });
    }
}

module.exports = { authenticateUserPassword, generateOneTokenForTheUser };