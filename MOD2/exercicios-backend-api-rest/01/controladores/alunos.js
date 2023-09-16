const alunos = require('../dados/alunos');

const getAlunos = (request, response) => { response.json(alunos) }

const getAlunoPorId = (request, response) => {
    const id = parseInt(request.params.id);
    if (isNaN(id)) return response.status(400).json({ mensagem: 'ID inválido.' });

    const aluno = alunos.find(element => element.id === id);
    if (!aluno) return response.status(404).json({ mensagem: 'Aluno não encontrado.' });

    response.json(aluno);
};

const criarAluno = (request, response) => {
    const { nome, sobrenome, idade, curso } = request.body;

    if (!nome || !sobrenome || !idade || !curso) return response.status(400).json({ mensagem: 'Campos obrigatórios não informados.' });

    const textValidation = typeof nome !== 'string' || typeof sobrenome !== 'string' || typeof curso !== 'string';
    if (textValidation) return response.status(400).json({ mensagem: 'Campos de texto inválidos.' });

    if (idade < 18) return response.status(400).json({ mensagem: 'Aluno deve ter pelo menos 18 anos.' });

    const novoAluno = {
        id: alunos.length + 1,
        nome,
        sobrenome,
        idade,
        curso
    };

    alunos.push(novoAluno);
    response.status(201).send();
};

const excluirAluno = (request, response) => {
    const id = parseInt(request.params.id);

    if (isNaN(id)) return response.status(400).json({ mensagem: 'ID inválido.' });
    const indice = alunos.findIndex(element => element.id === id);

    if (indice === -1) return response.status(404).json({ mensagem: 'Aluno não encontrado.' });
    const alunoRemovido = alunos.splice(indice, 1)[0];

    response.status(200).json(alunoRemovido);
};

module.exports = {
    getAlunos,
    getAlunoPorId,
    criarAluno,
    excluirAluno
};