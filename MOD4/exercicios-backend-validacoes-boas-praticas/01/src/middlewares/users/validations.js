const validationsFromTextForUserRegistration = (request, response, next) => {
    const { nome, email, senha } = request.body;

    if (!nome || !email || !senha) return response.status(400).json({ message: "campos vazios" });
    let emailFormatInRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailFormatInRegex.test(email)) response.status(400).json({ message: "o formato do email é inválido." });

    next();
}

const validationsFromTextForUserLogin = (request, response, next) => {
    const { email, senha } = request.body;

    if (!email || !senha) response.status(400).json({ message: "campos vazios" });
    let emailFormatInRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailFormatInRegex.test(email)) response.status(400).json({ message: "o formato do email é inválido." });

    next();
}

module.exports = {
    validationsFromTextForUserRegistration,
    validationsFromTextForUserLogin
}