const pool = require('../utils/databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtPassword = require('../private/password');

const registerOneNewUser = async (request, response) => {
    const { nome, email, senha } = request.body;

    //criptografa a senha
    let cryptographPassword = await bcrypt.hash(senha, 10);

    //salva o hash da senha no banco, bem como os outros dados do usuário
    let returnDB = await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *", [nome, email, cryptographPassword]);

    //retorna na tela o usurio criado
    response.status(201).json({ comando_utilizado: returnDB.command, linhas_afetadas: returnDB.rows });
}

const generateOneTokenForTheUser = async (request, response) => {
    const { email } = request.body;

    //busca o usuário no banco
    let existentUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    //com base no id, usa a senha da API para criar um token válido por 8 horas nesse caso
    const token = jwt.sign({ id: existentUser.rows[0].id }, jwtPassword, { expiresIn: "8h" });

    //desestrutura do usuário do banco as informações gerais e o token
    const { senha: _, ...loggedUser } = existentUser.rows[0];

    //mostra as informações adquiridas do usuário e seu token
    response.status(200).json({ usuario: loggedUser, token });
}

const verifyUserLogin = async (request, response) => {
    const { authorization } = request.headers;

    //pega o token extraido do formato Barer
    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtPassword);

        const { rows, rowCount } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        if (rowCount < 1) response.status(401).json({ mensagem: "usuário não encontrado" });

        request.user = rows[0];

        return response.json(request.user);
    }
    catch (error) {
        response.status(401).json({ mensagem: "Não Autorizado" })
        console.error(error.message);
    }
};

module.exports = {
    registerOneNewUser,
    verifyUserLogin,
    generateOneTokenForTheUser
}