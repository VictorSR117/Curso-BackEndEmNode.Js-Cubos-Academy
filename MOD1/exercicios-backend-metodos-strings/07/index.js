const email = "aluno@cubos.academy";

!email.includes("@") || !email.includes(".") ? console.log("E-mail inválido") : email.startsWith(".") || email.endsWith(".") ? console.log("E-mail inválido") : console.log("E-mail válido");