const jwt = require('jsonwebtoken');
const jwtPassword = require('../../private/password');

const verifyIfUserIsLogged = async (request, response, next) => {
    const { authorization } = request.headers;

    //verifica se o topken foi informado
    if (!authorization) response.status(401).json({ mensagem: "não autorizado" });

    //pega o token extraido do formato Barer
    const token = authorization.split(' ')[1];

    try {
        //valida o token com a senha da API
        jwt.verify(token, jwtPassword);
        next();
    }
    catch (error) {
        response.status(401).json({ mensagem: "Não Autorizado" })
        console.error(error.message);
    }
}

module.exports = verifyIfUserIsLogged;