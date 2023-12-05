const jwtPassword = require('../../../private/password');
const pool = require('../../../utils/databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUserPassword = async (request, response, next) => {
    const { email, senha } = request.body;

    try {
        //busca o usuário no banco
        let existentUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        //compara se a senha passada corresponde com a do banco
        const validPassword = await bcrypt.compare(senha, existentUser.rows[0].senha);

        //retorna um erro caso a senha esteja incorreta
        if (!validPassword) response.status(400).json({ mensagem: "E-mail ou senha inválidos" })

        next();
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'erro interno do servidor' });
    }
}

const generateOneTokenForTheUser = async (request, response) => {
    const { email } = request.body;

    try {
        //busca o usuário no banco
        let existentUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        //com base no id, usa a senha da API para criar um token válido por 8 horas nesse caso
        const token = jwt.sign({ id: existentUser.rows[0].id }, jwtPassword, { expiresIn: "8h" });

        //desestrutura do usuário do banco as informações gerais e o token
        const { senha: _, ...loggedUser } = existentUser.rows[0];

        //mostra as informações adquiridas do usuário e seu token
        response.status(200).json({ usuario: loggedUser, token });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: 'erro interno do servidor' });
    }
}

module.exports = { authenticateUserPassword, generateOneTokenForTheUser };