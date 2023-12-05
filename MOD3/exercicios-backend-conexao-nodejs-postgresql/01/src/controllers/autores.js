const pool = require('../utils/databaseConnection');
const { format } = require('date-fns');

const findAuthor = async (request, response) => {
    const { id } = request.params;

    //validando se o id está correto.
    if (isNaN(id)) response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });

    // Verificando se o autor existe
    const existentAuthor = await pool.query('SELECT nome FROM autores WHERE id = $1', [id]);
    if (existentAuthor.rowCount === 0) response.status(404).json({ mensagem: "Autor não encontrado." });

    try {
        const authors = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        const allBooksTheAuthor = await pool.query('SELECT * FROM livros WHERE id_autor = $1', [id]);

        let authorInformations = {
            id: authors.rows[0].id,
            nome: authors.rows[0].nome,
            idade: authors.rows[0].idade,
            livros: []
        }

        // Adicionando os livros do autor ao array "livros"
        allBooksTheAuthor.rows.forEach(book => {
            authorInformations.livros.push({
                id: book.id,
                nome: book.nome,
                genero: book.genero,
                editora: book.editora,
                data_publicacao: format(new Date(book.data_publicacao), 'yyyy-MM-dd')
            });
        });

        return response.status(200).json(authorInformations);
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: "Erro ao consultar autores." });
    }
}

const insertAuthor = async (request, response) => {
    const { nome, idade } = request.body;

    // Validando se o nome foi informado
    if (!nome) return response.status(400).json({ mensagem: "O campo nome é obrigatório." });

    try {
        // Verificando se o autor já existe
        const existentAuthor = await pool.query('SELECT nome FROM autores WHERE nome = $1', [nome]);
        if (existentAuthor.rowCount > 0) return response.status(400).json({ mensagem: "O autor já existe." });

        // Inserindo o autor no banco de dados
        await pool.query("INSERT INTO autores (nome, idade) VALUES ($1, $2) RETURNING *", [nome, idade]);
        response.status(201).json({ message: "autor inserido com sucesso!" });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: "Erro ao cadastrar autor." });
    }
}

module.exports = {
    findAuthor,
    insertAuthor
}