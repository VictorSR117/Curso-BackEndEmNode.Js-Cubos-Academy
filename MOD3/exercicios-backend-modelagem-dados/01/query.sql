--criação do banco
CREATE DATABASE super_mercado_db;

--criação das tabelas
CREATE TABLE categorias (id SERIAL PRIMARY KEY, nome VARCHAR(50) NOT NULL);

CREATE TABLE clientes (cpf CHAR(11) UNIQUE NOT NULL, nome VARCHAR(150) NOT NULL);

CREATE TABLE vendedores (cpf CHAR(11) UNIQUE NOT NULL, nome VARCHAR(150) NOT NULL);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco INT NOT NULL,
  quantidade_em_estoque INT NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
  valor INT NOT NULL,
  cliente_cpf CHAR(11) REFERENCES clientes(cpf),
  vendedor_cpf CHAR(11) REFERENCES vendedores(cpf)
);

CREATE TABLE itens_do_pedido(
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id),
  quantidade INTEGER NOT NULL,
  produto_id INTEGER REFERENCES produtos(id)
);

--inserção de dados nas tabelas
INSERT INTO categorias (nome) VALUES ('frutas'), ('verduras'), ('massas'), ('bebidas'), ('utilidades');

INSERT INTO produtos (nome, descricao, preco, quantidade_em_estoque, categoria_id)
VALUES ('Mamão', 'Rico em vitamina A, potássio e vitamina C', 300, 123, 1),
('Maça', 'Fonte de potássio e fibras.', 90, 34, 1), 
('Cebola', 'Rico em quercetina, antocianinas, vitaminas do complexo B, C.', 50, 76, 2),
('Abacate', 'NÃO CONTÉM GLÚTEN.', 150, 64, 1), ('Tomate', 'Rico em vitaminas A, B e C.', 125, 88, 2),
('Acelga', 'NÃO CONTÉM GLÚTEN.', 235, 13, 2), 
('Macarrão parafuso', 'Sêmola de trigo enriquecida com ferro e ácido fólico, ovos e corantes naturais', 690, 5, 3),
('Massa para lasanha', 'Uma reunião de família precisa ter comida boa e muita alegria.', 875, 19, 3),
('Refrigerante coca cola lata', 'Sabor original', 350, 189, 4),
('Refrigerante Pepsi 2l', 'NÃO CONTÉM GLÚTEN. NÃO ALCOÓLICO.', 700, 12, 4),
('Cerveja Heineken 600ml', 'Heineken é uma cerveja lager Puro Malte, refrescante e de cor amarelo-dourado', 1200, 50, 4),
('Agua mineral sem gás', 'Smartwater é água adicionado de sais mineirais (cálcio, potássio e magnésio) livre de sódio e com pH neutro.', 130, 478, 4),
('Vassoura', 'Pigmento, matéria sintética e metal.', 2350, 30, 5),
('Saco para lixo', 'Reforçado para garantir mais segurança', 1340, 90, 5),
('Escova dental', 'Faça uma limpeza profunda com a tecnologia inovadora', 1000, 44, 5),
('Balde para lixo 50l', 'Possui tampa e fabricado com material reciclado', 2290, 55, 5),
('Manga', 'Rico em Vitamina A, potássio e vitamina C', 198, 176, 1),
('Uva', 'NÃO CONTÉM GLÚTEN.', 420, 90, 1);

INSERT INTO clientes (cpf, nome)
VALUES ('80371350042', 'José Augusto Silva'), ('67642869061', 'Antonio Oliveira'),
('63193310034', 'Ana Rodrigues'), ('75670505018', 'Maria da Conceição');

INSERT INTO vendedores (cpf, nome)
VALUES ('82539841031', 'Rodrigo Sampaio'), ('23262546003', 'Beatriz Souza Santos'),
('28007155023', 'Carlos Eduardo');

---------------------------------REALIZANDO AS ATIVIDADES--------------------------------------------
--a) José Algusto comprou os seguintes itens com o vendedor Carlos Eduardo
INSERT INTO pedidos (valor, cliente_cpf, vendedor_cpf)
VALUES (0, '80371350042', '28007155023');

-- Registrar os itens do pedido
INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id)
VALUES
  (2, 1, (SELECT id FROM produtos WHERE nome = 'Mamão')),
  (2, 1, (SELECT id FROM produtos WHERE nome = 'Refrigerante Pepsi 2l')),
  (2, 6, (SELECT id FROM produtos WHERE nome = 'Cerveja Heineken 600ml')),
  (2, 1, (SELECT id FROM produtos WHERE nome = 'Escova dental')),
  (2, 5, (SELECT id FROM produtos WHERE nome = 'Maça'));

-- Calcular o valor total do pedido e atualizar a tabela de pedidos
UPDATE pedidos
SET valor = (SELECT SUM(p.preco * ip.quantidade)
             FROM itens_do_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = pedido_id)
WHERE id = 2;

-- Atualizar o estoque dos produtos vendidos
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Mamão';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Refrigerante Pepsi 2l';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 6 WHERE nome = 'Cerveja Heineken 600ml';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Escova dental';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 5 WHERE nome = 'Maça';



--b)Ana Rodrigues comprou os seguintes itens com a vendedora Beatriz Souza Santos
INSERT INTO pedidos (valor, cliente_cpf, vendedor_cpf)
VALUES (0, (SELECT cpf FROM clientes WHERE nome = 'Ana Rodrigues'), '23262546003');

-- Registrar os itens do pedido
INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id)
VALUES
  (3, 10, (SELECT id FROM produtos WHERE nome = 'Manga')),
  (3, 3, (SELECT id FROM produtos WHERE nome = 'Uva')),
  (3, 5, (SELECT id FROM produtos WHERE nome = 'Mamão')),
  (3, 10, (SELECT id FROM produtos WHERE nome = 'Tomate')),
  (3, 2, (SELECT id FROM produtos WHERE nome = 'Acelga'));

-- Calcular o valor total do pedido e atualizar a tabela de pedidos
UPDATE pedidos
SET valor = (SELECT SUM(p.preco * ip.quantidade)
             FROM itens_do_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = pedido_id)
WHERE id = 3;

-- Atualizar o estoque dos produtos vendidos
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 10 WHERE nome = 'Manga';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 3 WHERE nome = 'Uva';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 5 WHERE nome = 'Mamão';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 10 WHERE nome = 'Tomate';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 2 WHERE nome = 'Acelga';



--c) Maria da Conceição comprou os seguintes itens com a vendedora Beatriz Souza Santos
INSERT INTO pedidos (valor, cliente_cpf, vendedor_cpf)
VALUES (
  0, '75670505018', '23262546003'
);

-- Registrar os itens do pedido
INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id)
VALUES
  (4, 1, (SELECT id FROM produtos WHERE nome = 'Vassoura')),
  (4, 6, (SELECT id FROM produtos WHERE nome = 'Agua mineral sem gás')),
  (4, 5, (SELECT id FROM produtos WHERE nome = 'Manga'));

-- Calcular o valor total do pedido e atualizar a tabela de pedidos
UPDATE pedidos
SET valor = (SELECT SUM(p.preco * ip.quantidade)
             FROM itens_do_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = pedido_id)
WHERE id = 4;

-- Abater o estoque dos produtos vendidos
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Vassoura';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 6 WHERE nome = 'Agua mineral sem gás';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 5 WHERE nome = 'Manga';



--d) Maria da Conceição comprou os seguintes itens com o vendedor Rodrigo Sampaio
INSERT INTO pedidos (valor, cliente_cpf, vendedor_cpf)
VALUES (
  0,(SELECT cpf FROM clientes WHERE nome = 'Maria da Conceição'), (SELECT cpf FROM vendedores WHERE nome = 'Rodrigo Sampaio')
);

-- Registrar os itens do pedido
INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id)
VALUES
  (5, 1, (SELECT id FROM produtos WHERE nome = 'Balde para lixo 50l')),
  (5, 6, (SELECT id FROM produtos WHERE nome = 'Uva')),
  (5, 1, (SELECT id FROM produtos WHERE nome = 'Macarrão parafuso')),
  (5, 3, (SELECT id FROM produtos WHERE nome = 'Mamão')),
  (5, 20, (SELECT id FROM produtos WHERE nome = 'Tomate')),
  (5, 2, (SELECT id FROM produtos WHERE nome = 'Acelga'));

-- Calcular o valor total do pedido e atualizar a tabela de pedidos
UPDATE pedidos
SET valor = (SELECT SUM(p.preco * ip.quantidade)
             FROM itens_do_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = pedido_id)
WHERE id = 5;

-- Abater o estoque dos produtos vendidos
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Balde para lixo 50l';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 6 WHERE nome = 'Uva';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Macarrão parafuso';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 3 WHERE nome = 'Mamão';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 20 WHERE nome = 'Tomate';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 2 WHERE nome = 'Acelga';



--e) Antonio Oliveira comprou os seguintes itens com o vendedor Rodrigo Sampaio
INSERT INTO pedidos (valor, cliente_cpf, vendedor_cpf)
VALUES (
  0, (SELECT cpf FROM clientes WHERE nome = 'Antonio Oliveira'), (SELECT cpf FROM vendedores WHERE nome = 'Rodrigo Sampaio')
);

-- Registrar os itens do pedido
INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id)
VALUES
  (6, 8, (SELECT id FROM produtos WHERE nome = 'Uva')),
  (6, 1, (SELECT id FROM produtos WHERE nome = 'Massa para lasanha')),
  (6, 3, (SELECT id FROM produtos WHERE nome = 'Manga')),
  (6, 8, (SELECT id FROM produtos WHERE nome = 'Tomate')),
  (6, 2, (SELECT id FROM produtos WHERE nome = 'Cerveja Heineken 600ml'));

-- Calcular o valor total do pedido e atualizar a tabela de pedidos
UPDATE pedidos
SET valor = (SELECT SUM(p.preco * ip.quantidade)
             FROM itens_do_pedido ip
             JOIN produtos p ON ip.produto_id = p.id
             WHERE ip.pedido_id = pedido_id)
WHERE id = 6;

-- Abater o estoque dos produtos vendidos
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 8 WHERE nome = 'Uva';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 1 WHERE nome = 'Massa para lasanha';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 3 WHERE nome = 'Manga';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 8 WHERE nome = 'Tomate';
UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - 2 WHERE nome = 'Cerveja Heineken 600ml';