const convidados = require('../data/dados')

const listarConvidados = (request, response) => {
    const nome = request.query.nome;

    if (!nome) {
        return response.json(convidados);
    }

    const guest = convidados.find(currentName => currentName === nome);
    if (guest) {
        response.json({ mensagem: "Convidado presente." });
    } else {
        response.json({ mensagem: "O convidado buscado não está presente na lista." });
    }
}

const adicinarConvidado = (request, response) => {
    const nomeCompleto = request.body.nome;

    if (!nomeCompleto) return response.json({ mensagem: "O nome é obrigatório!" });

    const guest = convidados.find(currentName => currentName === nomeCompleto);

    if (guest) response.json({ mensagem: "O nome do convidado a ser adicionado já existe na lista." });

    else {
        convidados.push(nomeCompleto);
        response.json({ mensagem: "Convidado adicionado." });
    }
}

const excluirConvidado = (request, response) => {
    const nome = request.params.nome;

    let guest = convidados.findIndex(currentName => currentName === nome);
    if (guest !== -1) {
        convidados.splice(guest, 1);
        response.json({ mensagem: "Convidado removido." });
    }
    else response.json({ mensagem: "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." });
}

module.exports = {
    listarConvidados,
    adicinarConvidado,
    excluirConvidado
}