const livros = ['Guerra e Paz', 'A Montanha Mágica', 'Cem Anos de Solidão', 'Dom Quixote', 'A Divina Comédia'];
const nomeDoLivro = "Dom Quixote";

let index = livros.findIndex(book => book === nomeDoLivro)

console.log(`O livro está na posição ${index+1}`);