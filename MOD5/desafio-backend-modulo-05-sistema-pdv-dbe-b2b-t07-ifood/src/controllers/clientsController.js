const {
    findClientByCpf,
    registerNewClientDatabase,
    editClientWithContext
} = require("../database/clientDatabase");
const { findByIdWithContext, findByEmailWithContext, listAllWithContext } = require("../database/utilsDatabase");

const clientRegister = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const clientEmailAlreadyExists = await findByEmailWithContext('clientes', email);

        if (clientEmailAlreadyExists) {
            return res.status(400).json({
                mensagem: "O e-mail informado já está cadastrado."
            });
        }

        const cpfAlreadyExists = await findClientByCpf(cpf);

        if (cpfAlreadyExists) {
            return res.status(400).json({
                mensagem: "O CPF informado já está cadastrado."
            });
        }

        const client = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        };

        const newClient = await registerNewClientDatabase(client);
        return res.status(200).json(newClient);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detailClient = async (req, res) => {
    const clientId = req.params.id;

    if (!clientId) return res.status(400).json({ mensagem: "O campo id é obrigatório" });
    if (isNaN(clientId)) return res.status(400).json({ mensagem: "O campo id deve ser um número válido" });

    try {
        const client = await findByIdWithContext("clientes", clientId);

        if (!client) {
            return res.status(404).json({ mensagem: "Cliente não encontrado" });
        }

        return res.status(200).json(client);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listAllClients = async (req, res) => {
    try {
        return res.status(200).json(await listAllWithContext("clientes"));
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const clientExist = await findByIdWithContext("clientes", id);

        if (!clientExist) {
            return res.status(400).json({ mensagem: "Cliente não encontrado" });
        }

        const existCpf = await findClientByCpf(cpf);

        const existEmail = await findByEmailWithContext("clientes", email);

        if(existCpf || existEmail) {
            return res.status(400).json({ mensagem: "Os dados informados já foram cadastrados." });
        };

        const client = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        };

        const updatedClient = await editClientWithContext(id, client);

        if (updatedClient > 0) {
            return res.status(400).json({ mensagem: "Erro ao atualizar o cliente" });
        }

        return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    clientRegister,
    detailClient,
    listAllClients,
    editClient
};
