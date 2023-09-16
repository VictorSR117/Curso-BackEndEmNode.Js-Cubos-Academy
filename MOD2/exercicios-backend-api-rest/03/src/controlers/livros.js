const livros = require('../data/dados')

const listBook = (request, response) => response.json(livros);


const listBookPerID = (request, response) => {
    const test = (v1, v2, v3) => {
        if (!v1) return response.status(v2).json({ mensagem: v3 });
    }
    //validação numérica para o ID de páginas
    const id = parseInt(request.params.id);
    if (isNaN(id)) return response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });

    //validando a existencia do livro no array
    const livro = livros.find(element => element.id === id);
    if (!livro) return response.status(404).json({ mensagem: 'Não existe livro para o ID informado.' });

    response.json(livro);
};

const addBook = (request, response) => {
    const { titulo, autor, ano, numPaginas } = request.body;
    const newBook = { id: livros.length + 1, titulo, autor, ano, numPaginas }

    //validando se o autor e o titulo estão na requisição
    if (!titulo) return response.status(400).json({ mensagem: "O titulo é obrigatório!" });
    if (!autor) return response.status(400).json({ mensagem: "O autor é obrigatório!" });

    //validação numérica para o numero de páginas
    if (typeof numPaginas !== 'number') return response.status(400).json({ mensagem: 'O valor do parâmetro numPaginas é inválido.' });

    //validação para os textos da requisição
    const textValidation = typeof titulo !== 'string' || typeof autor !== 'string' || typeof ano !== 'string';
    if (textValidation) return response.status(400).json({ mensagem: 'Campos de texto inválidos.' });

    //validando se o livro ja existe
    let book = livros.find(currentBook => currentBook.titulo === titulo);
    if (book) response.json({ mensagem: "O livro já existe!" });

    else {
        livros.push(newBook);
        response.status(201).send();
    }
}

const changeBook = (request, response) => {
    const { titulo, autor, ano, numPaginas } = request.body;
    const id = parseInt(request.params.id);

    if (!titulo) return response.status(400).json({ mensagem: "O título é obrigatório!" });
    if (!autor) return response.status(400).json({ mensagem: "O autor é obrigatório!" });

    const index = livros.findIndex(currentBook => currentBook.id === id);

    if (index !== -1) {
        // Se encontrarmos um livro com o ID, substitua-o pelos novos valores
        livros[index] = { id, titulo, autor, ano, numPaginas };
        response.status(200).json({ mensagem: "Livro substituído." });
    }
    else
        // Se não encontrarmos um livro com o ID, retorne uma mensagem de erro     
        response.status(404).json({ mensagem: "Não existe livro a ser substituído para o ID informado." });
}

const updateBook = (request, response) => {
    const { titulo, autor, ano, numPaginas } = request.body;
    const id = parseInt(request.params.id);

    const index = livros.findIndex(currentBook => currentBook.id === id);
    if (index !== -1) {
        // Se encontrarmos um livro com o ID, atualize as propriedades conforme necessário
        if (titulo !== undefined) livros[index].titulo = titulo;

        if (autor !== undefined) livros[index].autor = autor;

        if (ano !== undefined) livros[index].ano = ano;

        if (numPaginas !== undefined) livros[index].numPaginas = numPaginas;

        response.status(200).json({ mensagem: "Livro atualizado." });
    }
    else
        // Se não encontrarmos um livro com o ID, retorne uma mensagem de erro
        response.status(404).json({ mensagem: "Não existe livro a ser alterado para o ID informado." });
}


const deleteBook = (request, response) => {
    const id = parseInt(request.params.id);

    let book = livros.findIndex(currentBook => currentBook.id === id);
    if (book !== -1) {
        livros.splice(book, 1);
        response.json({ mensagem: "Livro removido." });
    }
    else response.json({ mensagem: "Não existe livro a ser removido para o ID informado." });
}

module.exports = {
    listBook,
    listBookPerID,
    addBook,
    changeBook,
    updateBook,
    deleteBook
}