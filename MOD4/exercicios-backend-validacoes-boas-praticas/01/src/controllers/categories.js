const searchCategoryDataInDb = require("../methods/categories/listAllCategories");

const listAllCategories = async (request, response) => searchCategoryDataInDb(request, response);

module.exports = listAllCategories;