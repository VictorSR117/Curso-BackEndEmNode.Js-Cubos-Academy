const nomeArquivo = 'Foto da Familia.pdf';

validationFile = nomeArquivo => {
    //nomeArquivo.endsWith(".jpg") || nomeArquivo.endsWith(".jpeg") || nomeArquivo.endsWith(".gif") || nomeArquivo.endsWith(".png") ? console.log("Arquivo válido") : console.log("Arquivo inválido");
    const extensionsFiles = [ "jpg", "jpeg", "gif", "png"];
    let isValid = extensionsFiles.some(e => nomeArquivo.endsWith(e));
    isValid ? console.log("Arquivo válido") : console.log("Arquivo inválido");
}

validationFile(nomeArquivo)