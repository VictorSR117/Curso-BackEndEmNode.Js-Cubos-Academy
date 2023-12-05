const jwt = require('jsonwebtoken');
const jwtPassword = require('../private/jwtPassword');
const pool = require('../utils/connectionDB');
const { format } = require('date-fns');

const formatDateAndValue = (array) => {
    return {
        ...array.rows[0],
        data: format(array.rows[0].data, "dd/MM/yyyy"),
        valor: parseFloat((Math.ceil(array.rows[0].valor / 100 * 100) / 100).toFixed(2))
    };
}

const createATransactionForTheUser = async (request, response) => {
    const { tipo, descricao, valor, data, categoria_id } = request.body;
    const { authorization } = request.headers;

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtPassword);

        const { rows } = await pool.query("INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", [tipo, descricao, valor, data, categoria_id, id]);
        const transactionId = rows[0].id;

        const transactionDetails = await pool.query("SELECT t.*, c.descricao AS categoria_nome FROM transacoes t JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1 AND t.id = $2", [id, transactionId]);
        const formattedTransaction = formatDateAndValue(transactionDetails)

        return response.status(201).json(formattedTransaction);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const listAllUserTransactions = async (request, response) => {
    const { authorization } = request.headers;
    const { filtro } = request.query;

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtPassword);

        let query = "SELECT t.*, c.descricao AS categoria_nome FROM transacoes t JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1";
        if (filtro) query += " AND c.descricao = $2";

        const params = [id];
        if (filtro) params.push(filtro);

        const transactionDetails = await pool.query(query, params);
        let formattedTransaction = [];

        transactionDetails.rows.forEach(element => {
            formattedTransaction.push({
                ...element,
                data: format(element.data, "dd/MM/yyyy"),
                valor: parseFloat((Math.ceil(element.valor / 100 * 100) / 100).toFixed(2))
            });
        });

        request.user = formattedTransaction;
        return response.json(request.user);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const listAUserTransaction = async (request, response) => {
    const { id } = request.params;
    const { authorization } = request.headers;

    const token = authorization.split(' ')[1];
    let idTransaction = id;

    try {
        const { id } = jwt.verify(token, jwtPassword);

        const reslutQuery = await pool.query("SELECT t.*, c.descricao AS categoria_nome FROM transacoes t JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1 AND t.id = $2", [id, idTransaction]);
        if (reslutQuery.rowCount === 0) return response.status(404).json({ mensagem: "Transação não encontrada." });

        request.user = formatDateAndValue(reslutQuery);
        return response.json(request.user);
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const deleteAUserTransaction = async (request, response) => {
    const { id } = request.params;
    const { authorization } = request.headers;

    const token = authorization.split(' ')[1];
    let idTransaction = id;

    try {
        const { id } = jwt.verify(token, jwtPassword);

        const { rowCount } = await pool.query("SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2", [idTransaction, id]);
        if (rowCount < 1) return response.status(404).json({ mensagem: "Transação não encontrada." });

        await pool.query("DELETE FROM transacoes WHERE id = $1", [idTransaction]);

        return response.status(204).json();
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const presentTheUserEntryAndExitStatement = async (request, response) => {
    const { authorization } = request.headers;

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtPassword);
        const entrys = await pool.query("SELECT SUM(valor) FROM transacoes WHERE usuario_id = $1 AND tipo = 'entrada'", [id]);
        const exits = await pool.query("SELECT SUM(valor) FROM transacoes WHERE usuario_id = $1 AND tipo = 'saida'", [id]);

        let entrada;
        let saida;

        (typeof entrys.rows[0].sum === 'object') ? entrada = 0 : entrada = parseFloat((Math.ceil(entrys.rows[0].sum / 100 * 100) / 100).toFixed(2));
        (typeof exits.rows[0].sum === 'object') ? saida = 0 : saida = parseFloat((Math.ceil(exits.rows[0].sum / 100 * 100) / 100).toFixed(2));

        return response.json({
            entrada,
            saida
        });
    }
    catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: "Erro interno do Servidor" });
    }
}

const updateTransaction = async (request, response) => {
    const { id } = request.params;
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, jwtPassword);
        const userId = decodedToken.id;

        const { rowCount } = await pool.query('SELECT * FROM transacoes WHERE id = $1', [id]);
        const { rowCount: usuarioTransacao } = await pool.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, userId])
        if (usuarioTransacao < 1) {
            return response.status(404).json({ mensagem: 'Esta transação não pode ser alterada por esse cliente' })
        }

        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Registro não encontrado' })
        };

        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return response.status(404).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        } else if (tipo !== 'entrada' && tipo !== 'saida') {
            return response.status(400).json({ mensagem: 'Revise o tipo de transação.' })
        }

        const { rowCount: categoryRowCount } = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);

        if (categoryRowCount < 1) {
            return response.status(404).json({ mensagem: 'Categoria não encontrada' });
        }

        await pool.query(
            'UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6',
            [descricao, valor, data, categoria_id, tipo, id]
        )

        return response.status(204).json();
    } catch (error) {

        return response.status(500).json('Erro interno do servidor')
    }
}

module.exports = {
    createATransactionForTheUser,
    listAllUserTransactions,
    listAUserTransaction,
    deleteAUserTransaction,
    presentTheUserEntryAndExitStatement,
    updateTransaction
}