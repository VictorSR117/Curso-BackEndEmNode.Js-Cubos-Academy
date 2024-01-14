const validateUsablityToken = require('../../methods/users/tokenValidation');
const formatTheToken = require('../../methods/users/barerTokenFormat');

const verifyIfUserIsLogged = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) response.status(401).json({ mensagem: "não autorizado" });

    formatTheToken(authorization);
    try {
        validateUsablityToken(token);
        next();
    }
    catch (error) {
        response.status(401).json({ mensagem: "Não Autorizado" });
        console.error(error.message);
    }
}

module.exports = verifyIfUserIsLogged;