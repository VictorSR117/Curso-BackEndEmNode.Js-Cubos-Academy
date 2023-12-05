const jwtPassword = require("../../private/password");
const jwt = require('jsonwebtoken');
const pool = require("../../utils/databaseConnection");

const validationsFromTextForPokemonRegistration = (request, response, next) => {
    const { nome, habilidades, imagem, apelido } = request.body;

    //validando se os campos estão vazios ou não
    if (!nome || !habilidades || !imagem || !apelido) response.status(400).json({ message: "campos vazios" });

    //validando se as habilidades estão em uma string separada por espaços
    const habilidadesArray = habilidades.split(' ').filter(habilidade => habilidade.trim() !== '');

    if (habilidadesArray.length < 1) return response.status(400).json({ mensagem: "Habilidades devem ser uma string separada por espaços em branco" });

    return next();
}

const validationForPokemonId = async (request, response, next) => {
    const pokemonId = request.params.id;

    if (isNaN(pokemonId)) response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });

    return next();
}

const verifyExistenceOfUserAndReturnYourId = async (request, response, next) => {
    const { authorization } = request.headers;

    //pega o token extraido do formato Barer
    const token = authorization.split(' ')[1];

    try {
        let { id } = jwt.verify(token, jwtPassword);
        if (isNaN(id)) return response.status(400).json({ mensagem: 'O valor do parâmetro ID não é um número válido.' });

        const { rowCount } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if (rowCount < 1) return response.status(401).json({ mensagem: "usuário não encontrado" });

        request.user = id;

        return next();
    }
    catch (error) {
        response.status(401).json({ mensagem: "Não Autorizado" })
        console.error(error.message);
    }
}

module.exports = {
    validationsFromTextForPokemonRegistration,
    verifyExistenceOfUserAndReturnYourId,
    validationForPokemonId
};