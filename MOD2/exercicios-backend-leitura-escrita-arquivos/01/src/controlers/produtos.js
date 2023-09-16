const produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require("utils-playground");

const listAllProducts = (request, response) => { response.json(produtos); }

const listOneProductPerID = (request, response) => {
    //validação numérica para o ID de produtos
    const id = parseInt(request.params.idProduto);
    if (isNaN(id)) return response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });

    //validando a existencia do produto no array
    const product = produtos.find(element => element.id === id);
    if (!product) return response.status(404).json({ mensagem: 'O produto informado não existe.' });

    response.json(product);

};

const identifyTheZipCode = async (zipCode, response) => {
    if (isNaN(zipCode)) return response.status(400).json({ mensagem: 'O valor do parâmetro CEP da URL não é um número válido.' });

    try {
        let state = await getStateFromZipcode(zipCode);
        if (!state) return response.status(400).json({ mensagem: 'CEP inválido ou não encontrado.' });
        return state;
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao processar a solicitação.' });
    }
}

const calculateProductShipping = async (request, response) => {
    const id = parseInt(request.params.idProduto);
    let zipCode = request.params.cep;
    let UF;
    try { UF = await identifyTheZipCode(zipCode, response) }
    catch (error) { console.error(`UF não identificada, código do erro: ${error}`) }
    let basediscunt = 0.12;
    let discuntIfZipCodeIsBA_SE_AL_PE_PB = 0.10;
    let discuntIfZipCodeIsSP_RJ = 0.15;
    let productShipping = 0;

    if (isNaN(id)) return response.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });

    //validando a existencia do produto no array
    const product = produtos.find(element => element.id === id);
    if (!product) return response.status(404).json({ mensagem: 'O produto informado não existe.' });

    switch (UF) {
        case "BA":
        case "SE":
        case "AL":
        case "PE":
        case "PB":
            productShipping = product.valor * discuntIfZipCodeIsBA_SE_AL_PE_PB;
            break;
        case "SP":
        case "RJ":
            productShipping = product.valor * discuntIfZipCodeIsSP_RJ;
        default:
            productShipping = product.valor * basediscunt;
            break;
    }

    response.json({ product, UF, productShipping });
};

module.exports = {
    listAllProducts,
    listOneProductPerID,
    calculateProductShipping,
}