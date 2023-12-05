const pool = require('../utils/databaseConnection');
const { format } = require('date-fns');

const insertBook = async (request, response) => {
    const { id } = request.params;
    const { nome, genero, editora, data_publicacao } = request.body;

    // Validando se os campos obrigatórios foram informados
    if (!nome || !editora || !data_publicacao) response.status(400).json({ mensagem: "Os campos de nome, editora e data de publicação são obrigatórios." });

    // Validando a formatação da data de publicação
    if (!format(new Date(data_publicacao), 'yyyy-MM-dd', new Date(data_publicacao))) response.status(400).json({ mensagem: "Formato de data de publicação inválido. Use o formato yyyy-MM-dd." });

    try {
        // Verificando se o autor existe
        const existentAuthor = await pool.query('SELECT nome FROM autores WHERE id = $1', [id]);
        if (existentAuthor.rowCount === 0) return response.status(404).json({ mensagem: "Autor não encontrado." });

        // Verificando se o livro existe
        const existentBook = await pool.query('SELECT nome FROM livros WHERE nome = $1', [nome]);
        if (existentBook.rowCount > 0) return response.status(404).json({ mensagem: "O livro ja existe." });

        // Inserindo o livro no banco de dados associado ao autor
        await pool.query("INSERT INTO livros (nome, genero, editora, data_publicacao, id_autor) VALUES ($1, $2, $3, $4, $5)", [nome, genero, editora, data_publicacao, id]);

        return response.status(201).json({ message: "Livro inserido com sucesso!" });
    }
    catch (error) {
        console.error(error.message);
        response.status(500).json({ mensagem: "Erro ao cadastrar livro." });
    }
}

const listBooks = async (request, response) => {
    try {
        //listagem de todos os livros
        const books = await pool.query(`
            SELECT 
                l.id, 
                l.nome, 
                l.genero, 
                l.editora, 
                l.data_publicacao,
                a.id AS autor_id,
                a.nome AS autor_nome, 
                a.idade
            FROM livros l
            LEFT JOIN autores a ON l.id_autor = a.id;
        `);

        // Criar um objeto para armazenar os livros com autores
        let booksWithAuthors = [];

        // Iterar sobre os resultados e agrupar os livros com os autores
        books.rows.forEach(autores => {
            const livro = {
                id: autores.id,
                nome: autores.nome,
                genero: autores.genero,
                editora: autores.editora,
                data_publicacao: format(new Date(autores.data_publicacao), 'yyyy-MM-dd'),
                autor: {
                    id: autores.autor_id,
                    nome: autores.autor_nome,
                    idade: autores.idade
                }
            };
            booksWithAuthors.push(livro);
        });

        return response.json(booksWithAuthors);

    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro ao listar livros." });
    }
}

module.exports = {
    insertBook,
    listBooks
}