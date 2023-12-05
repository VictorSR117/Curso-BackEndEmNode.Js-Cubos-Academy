const axios = require('axios');

const requestsByAxios = axios.create({
    baseURL: "https://companyenrichment.abstractapi.com/v1",
    params: { api_key: process.env.API_KEY }
});

module.exports = requestsByAxios;