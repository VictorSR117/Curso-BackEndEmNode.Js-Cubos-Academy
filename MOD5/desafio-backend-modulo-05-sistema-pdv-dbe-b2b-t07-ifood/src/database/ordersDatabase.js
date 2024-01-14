const knex = require("../connections/knex");

const listingOrders = async (cliente_id) => {
    try {
        let query = knex("pedidos")
            .select(
                "pedidos.id",
                "pedidos.valor_total",
                "pedidos.observacao",
                "pedidos.cliente_id",
                "pedido_produtos.id as pedidoProduto_id",
                "pedido_produtos.quantidade_produto",
                "pedido_produtos.valor_produto",
                "pedido_produtos.pedido_id",
                "pedido_produtos.produto_id"
            )
            .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
            .leftJoin("produtos", "pedido_produtos.produto_id", "produtos.id");

        if (cliente_id) {
            query = query.where("pedidos.cliente_id", cliente_id);
        }

        const result = await query;

        const orders = [];

        result.forEach((row) => {
            const orderIndex = orders.findIndex((o) => o.pedido.id === row.id);

            if (orderIndex === -1) {
                const order = {
                    id: row.id,
                    valor_total: row.valor_total,
                    observacao: row.observacao,
                    cliente_id: row.cliente_id,
                };

                const productOrder = {
                    id: row.pedidoProduto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id,
                };

                orders.push({ pedido: order, pedido_produtos: [productOrder] });
            } else {
                const productOrder = {
                    id: row.pedidoProduto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id,
                };

                orders[orderIndex].pedido_produtos.push(productOrder);
            }
        });

        return orders;
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const findProductForEachProductId = async (pedido_produto) => {
    try {
        const invalidProducts = [];

        for (const produto of pedido_produto) {
            let currentProduct = await knex('produtos').where('id', produto.produto_id).first()

            if (!currentProduct || currentProduct.quantidade_estoque < produto.quantidade_produto) {
                invalidProducts.push(currentProduct);
            }

        };

        return invalidProducts;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const totalValue = async (pedido_produto) => {
    try {
        let totalValueOrder = 0;

        for (const produto of pedido_produto) {
            let currentProduct = await knex('produtos').where('id', produto.produto_id).first();

            totalValueOrder += currentProduct.valor * produto.quantidade_produto
        };

        return totalValueOrder;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const registeringOrder = async (body) => {
    try {
        const order = await knex('pedidos')
            .insert({
                cliente_id: body.cliente_id,
                observacao: body.observacao,
                valor_total: await totalValue(body.pedido_produtos)
            }).returning('*');

        for (const produto of body.pedido_produtos) {
            const currentProduct = await knex('produtos').where('id', produto.produto_id).first();

            await knex('pedido_produtos')
                .insert({
                    pedido_id: order[0].id,
                    produto_id: produto.produto_id,
                    quantidade_produto: produto.quantidade_produto,
                    valor_produto: currentProduct.valor
                }).returning('*');

            let reducedQuantity = currentProduct.quantidade_estoque - produto.quantidade_produto;

            await knex('produtos')
                .where('id', '=', produto.produto_id)
                .update({
                    quantidade_estoque: reducedQuantity
                })
        };

        return
    } catch (error) {
        return new Error("Erro no cadastro do pedido");
    }
};

module.exports = {
    listingOrders,
    findProductForEachProductId,
    registeringOrder
};
