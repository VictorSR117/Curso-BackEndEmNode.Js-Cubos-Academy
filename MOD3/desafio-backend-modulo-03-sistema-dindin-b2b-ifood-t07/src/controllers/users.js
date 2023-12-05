const pool = require('../utils/connectionDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../private/jwtPassword');

const registerOneNewUser = async (request, response) => {
    const { nome, email, senha } = request.body;

    try {
        let cryptographPassword = await bcrypt.hash(senha, 10);

        let inserction = await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *", [nome, email, cryptographPassword]);
        const { senha: _, ...userInformation } = inserction.rows[0];

        response.status(201).json(userInformation);
    }
    catch (error) {
        console.error(error.message);
        response.status(401).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
    }
}

const verifyUserLogin = async (request, response) => {
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtPassword);

        const { rows, rowCount } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if (rowCount < 1) response.status(401).json({ mensagem: "usuário não encontrado" });

        request.user = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        return response.json(request.user);
    }
    catch (error) {
        response.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        console.error(error.message);
    }
};

const updateUser = async (request, response) => {

    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];

    if (!token) {
        return response.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const { nome, email, senha } = request.body;

    try {
        const decodedToken = jwt.verify(token, jwtPassword);
        const userId = decodedToken.id;

        const { rowCount } = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [userId]
        );

        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        if (!nome || !email || !senha) {
            return response.status(400).json({ mensagem: 'Todos os campos devem ser informados' });
        }

        let cryptographPassword = await bcrypt.hash(senha, 10);

        await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
            [nome, email, cryptographPassword, userId]
        );

        return response.status(204).send();
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = {
    registerOneNewUser,
    verifyUserLogin,
    updateUser
}