const jwt = require('jsonwebtoken');
const jwtPassword = require('../../private/jwtPassword');

const verifyIfUserIsLogged = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) response.status(401).json({ mensagem: "não autorizado" });

    const token = authorization.slice(7);
    try {
        jwt.verify(token, jwtPassword);
        next();
    }
    catch (error) {
        response.status(401).json({ mensagem: "Não Autorizado" })
        console.error(error.message);
    }
}

module.exports = verifyIfUserIsLogged;