const pool = require('../../utils/databaseConnection');

const validationsFromTextForUserRegistration = (req, res, next) => {
    const { nome, email, senha } = req.body;

    //validando se os campos estão vazios ou não
    if (!nome || !email || !senha) res.status(400).json({ message: "campos vazios" });
    next();
}

const validationsFromTextForUserLogin = (req, res, next) => {
    const { email, senha } = req.body;

    //validando se os campos estão vazios ou não
    if (!email || !senha) res.status(400).json({ message: "campos vazios" });
    next();
}

const emailFormatValidation = (request, response, next) => {
    const { email } = request.body;

    //regex para formatação do email no formato [***@***.***] ou seja anything@exemple.com
    let emailFormatInRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    //verifica se o email está no formato correto
    return emailFormatInRegex.test(email) ? next() : response.status(400).json({ message: "o formato do email é inválido." });
}

const verifyIfUserExistis = async (request, response, next) => {
    const { email } = request.body;

    try {
        //busca por um registro no banco correspondente a esse email
        let existentUser = await pool.query('SELECT email FROM usuarios WHERE email = $1', [email]);

        //verifica se o email ja existe no banco
        existentUser.rowCount > 0 ? response.status(404).json({ mensagem: "O usuário ja existe." }) : next();
    }
    catch (error) {
        console.error(error.message);
    }
}

const verifyIfUserNotExistis = async (request, response, next) => {
    const { email } = request.body;

    try {
        //busca por um registro no banco correspondente a esse email
        let existentUser = await pool.query('SELECT email FROM usuarios WHERE email = $1', [email]);

        //verifica se o email ja existe no banco
        existentUser.rowCount === 0 ? response.status(404).json({ mensagem: "E-mail ou senha inválidos" }) : next();
    }
    catch (error) {
        console.error(error.message);
    }
}


module.exports = {
    validationsFromTextForUserRegistration,
    validationsFromTextForUserLogin,
    emailFormatValidation,
    verifyIfUserExistis,
    verifyIfUserNotExistis
}