const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createANewUser, updateUserbyId } = require('../database/userChecks');
const { listOneRegisterById } = require('../database/genericChekcs');
const criptographPAssword = require('../methods/users/criptographPAssword');

const registerOneNewUser = async (request, response) => {
    const { nome, email, senha } = request.body;

    try {
        let cryptographPassword = await criptographPAssword(senha);

        let inserction = await createANewUser(nome, email, cryptographPassword);
        const { senha: _, ...userInformation } = inserction;

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
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const result = await listOneRegisterById("usuarios", { id });
        if (result < 1) response.status(401).json({ mensagem: "usuário não encontrado" });

        request.user = {
            id: result.id,
            nome: result.nome,
            email: result.email
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

    if (!token) return response.status(401).json({ mensagem: 'Token não fornecido' });

    const { nome, email, senha } = request.body;

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.id;

        let user = await listOneRegisterById("usuarios", userId)

        if (user.length < 1) return response.status(404).json({ mensagem: 'Usuário não encontrado' });

        if (!nome || !email || !senha) return response.status(400).json({ mensagem: 'Todos os campos devem ser informados' });

        let cryptographPassword = await bcrypt.hash(senha, 10);

        await updateUserbyId(userId, nome, email, cryptographPassword);

        return response.status(204).send();
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = {
    registerOneNewUser,
    verifyUserLogin,
    updateUser
}