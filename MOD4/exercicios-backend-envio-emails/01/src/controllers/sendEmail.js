const knex = require('../conexao');
const send = require('../email');
const htmlCompiler = require('../utils/compilador');
const path = require('path');

const sendEmailForTheUser = async (req, res) => {
    const { text } = req.body;

    try {
        const emails = await knex('usuarios');

        for (const email of emails) {

            const emailHtmlPath = path.join(__dirname, '../template/email.html');
            const htmlNewsLetter = await htmlCompiler(emailHtmlPath, {
                user: email.nome,
                text
            });

            send(email.email, "Newsletter", htmlNewsLetter);
        }
        return res.status(201).json({ message: 'E-mails enviados com sucesso!' });
    }
    catch (error) {
        console.error(error.message);
    }
}

module.exports = sendEmailForTheUser;