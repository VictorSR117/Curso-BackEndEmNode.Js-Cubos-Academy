const nome = 'Guido Cerqueira';

nickNameGenerator = nome => {
    let nick = `@${nome}`;
    nick = nick.toLowerCase()
    nick = nick.replaceAll(" ", "") //com o nick.trim() não funcionou
    if (nick.length > 13) {
        nick = nick.substring(0, 13);
        console.log(nick);
    }
    else console.log(nick);
}

nickNameGenerator(nome)