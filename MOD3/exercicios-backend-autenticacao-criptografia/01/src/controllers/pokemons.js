const pool = require('../utils/databaseConnection');

const registerANewPokemonForTheUser = async (request, response) => {
    // Obtém o ID do usuário a partir do token
    const usuario_id = request.user;
    const { nome, habilidades, imagem, apelido } = request.body;

    try {
        //insere um pokemon para o usuário
        await pool.query("INSERT INTO pokemons (usuario_id, nome, habilidades, imagem, apelido) VALUES ($1, $2, $3, $4, $5)", [usuario_id, nome, habilidades, imagem, apelido]);

        return response.status(201).json({ mensagem: "Pokémon cadastrado com sucesso" });
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro ao cadastrar pokémon" });
    }
}

const listAllUsersPokemons = async (request, response) => {
    // Obtém o ID do usuário a partir do token
    const usuario_id = request.user;
    try {
        const pokemons = await pool.query("SELECT * FROM pokemons WHERE usuario_id = $1", [usuario_id]);
        const user = await pool.query("SELECT nome FROM usuarios WHERE id = $1", [usuario_id]);
        let nameOfUser = user.rows[0].nome;

        console.log(nameOfUser);

        // Mapeia os resultados para retornar um array de objetos com habilidades como array
        const pokemonList = pokemons.rows.map(pokemon => ({
            id: pokemon.id,
            usuario: nameOfUser,
            nome: pokemon.nome,
            habilidades: pokemon.habilidades.split(' ').join(', '),
            imagem: pokemon.imagem,
            apelido: pokemon.apelido
        }));

        return response.status(200).json(pokemonList);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro ao listar pokémons" });
    }
}

const listAUsersPokemon = async (request, response) => {
    const usuario_id = request.user;
    const pokemonId = request.params.id;
    try {
        const pokemon = await pool.query("SELECT * FROM pokemons WHERE id = $1 AND usuario_id = $2", [pokemonId, usuario_id]);
        if (!pokemon.rows[0]) return response.status(404).json({ mensagem: "Pokémon não encontrado ou não pertence ao usuário" });

        const user = await pool.query("SELECT nome FROM usuarios WHERE id = $1", [usuario_id]);
        let nameOfUser = user.rows[0].nome;

        const selectedPokemon = {
            id: pokemon.rows[0].id,
            usuario: nameOfUser,
            nome: pokemon.rows[0].nome,
            habilidades: pokemon.rows[0].habilidades.split(' ').join(', '),
            imagem: pokemon.rows[0].imagem,
            apelido: pokemon.rows[0].apelido
        };

        return response.status(200).json(selectedPokemon);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro ao buscar pokémon" });
    }
}

const changePokemonNickname = async (request, response) => {
    const { apelido } = request.body;

    if (!apelido) response.status(400).json({ message: "campo apelido vazio" });

    try {
        const usuario_id = request.user;
        const pokemonId = request.params.id;
        const { apelido } = request.body;

        const updateResult = await pool.query("UPDATE pokemons SET apelido = $1 WHERE id = $2 AND usuario_id = $3", [apelido, pokemonId, usuario_id]);

        if (updateResult.rowCount === 0) return response.status(404).json({ mensagem: "Pokémon não encontrado ou não pertence ao usuário" });

        return response.status(200).json({ mensagem: "Apelido do Pokémon atualizado com sucesso" });
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro ao atualizar apelido do pokémon" });
    }
}

const deleteOnePokemon = async (request, response) => {
    try {
        const usuario_id = request.user;
        const pokemonId = request.params.id;

        const deleteResult = await pool.query("DELETE FROM pokemons WHERE id = $1 AND usuario_id = $2", [pokemonId, usuario_id]);

        if (deleteResult.rowCount === 0) return response.status(404).json({ mensagem: "Pokémon não encontrado ou não pertence ao usuário" });

        return response.status(200).json({ mensagem: "Pokémon excluído com sucesso" });
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro ao excluir pokémon" });
    }
}

module.exports = {
    registerANewPokemonForTheUser,
    listAllUsersPokemons,
    changePokemonNickname,
    listAUsersPokemon,
    deleteOnePokemon
}