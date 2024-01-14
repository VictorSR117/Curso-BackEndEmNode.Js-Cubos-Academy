const jwt = require('jsonwebtoken');
const validateUsablityToken = token => jwt.verify(token, process.env.SECRET_KEY);
module.exports = validateUsablityToken;