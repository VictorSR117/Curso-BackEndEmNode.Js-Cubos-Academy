// clientes
const patricia = { nome: "Patricia", carrinho: [] };
const carlos = { nome: "Carlos", carrinho: [] };
const renato = { nome: "Renato", carrinho: [] };
const jose = { nome: "José", carrinho: [] };
const roberto = { nome: "Roberto", carrinho: [] };

// produtos
const tv = { nome: "TV Samsung 4K", valorEmCentavos: 129900 };
const notebook = { nome: "Notebook Dell", valorEmCentavos: 399990 };
const mouse = { nome: "Mouse MX Master 3", valorEmCentavos: 23000 };
const teclado = { nome: "Teclado Keychron K8", valorEmCentavos: 50000 };
const caboUsb = { nome: "Cabo USB 2 Metros", valorEmCentavos: 1990 };
const carregador = { nome: "Carregador portátil", valorEmCentavos: 4590 };
const webcam = { nome: "Webcam C920s", valorEmCentavos: 80000 };
const monitor = { nome: "Monitor LG 29 FHD", valorEmCentavos: 129900 };

imprimirCarrinho = cliente => {
    console.log(cliente.nome);
    console.log(JSON.stringify(cliente.carrinho, null, 2)); // 2 para indentação
}

//função para inserção de dados no carrinho
inserirCarrinho = (nome, item, qtd) => nome.carrinho.push({ item, quantidade: qtd });

//inserção de dados no carrinho dos respectivos clientes
//jose
inserirCarrinho(jose, tv, 1);
inserirCarrinho(jose, caboUsb, 2);
inserirCarrinho(jose, webcam, 1);

//carlos
inserirCarrinho(carlos, notebook, 2);

//patricia
inserirCarrinho(patricia, teclado, 1);
inserirCarrinho(patricia, caboUsb, 2);
inserirCarrinho(patricia, carregador, 1);
inserirCarrinho(patricia, mouse, 1);
inserirCarrinho(patricia, monitor, 1);

//renato
inserirCarrinho(renato, webcam, 5);

//roberto
inserirCarrinho(roberto, webcam, 1);
inserirCarrinho(roberto, caboUsb, 2);
inserirCarrinho(roberto, monitor, 1);

//mostrando na tela de maneira limpa os conteúdosm do carrinho de cada cliente
imprimirCarrinho(jose);
imprimirCarrinho(carlos);
imprimirCarrinho(patricia);
imprimirCarrinho(renato);
imprimirCarrinho(roberto);