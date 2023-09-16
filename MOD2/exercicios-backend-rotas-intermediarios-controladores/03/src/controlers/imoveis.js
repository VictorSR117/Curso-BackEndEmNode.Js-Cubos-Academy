const imoveis = require('../dados/imoveis');
const propertyListing = (request, response) => response.send(imoveis);

const propertyListedById = (request, response) => {
    let imovel = imoveis.find(element => element.id === parseInt(request.params.id))
    response.send(imovel)
}

module.exports = { propertyListing, propertyListedById }