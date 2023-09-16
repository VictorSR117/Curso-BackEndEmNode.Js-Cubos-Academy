const autenticacao = (request, response, next) => {
    const senha = request.query.senha;

    if (senha !== 'cubos123') return response.status(401).json({ mensagem: 'Senha incorreta.' });

    next();
};

module.exports = autenticacao;