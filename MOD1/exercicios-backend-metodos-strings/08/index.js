const cpf = "011.022.033-44";

cpfFormated = cpf => {
    let cpfBeutfy;
    cpfBeutfy = cpf.replaceAll(".", "").replace("-", "")
    console.log(`${cpfBeutfy}`);
}

cpfFormated(cpf);