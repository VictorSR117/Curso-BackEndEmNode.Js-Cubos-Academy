const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const send = (to, subject, html) => {
    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
    });
}

module.exports = send;