const bcrypt = require('bcrypt');
module.exports = async senha => await bcrypt.hash(senha, 10);