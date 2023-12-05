--criação do banco de dados
CREATE DATABASE exercicio_crud_sql;

--criação da tabela usuarios
CREATE TABLE usuarios (
	id SERIAL,
  	nome TEXT NOT NULL,
  	idade SMALLINT,
  	email VARCHAR(50),
  	senha VARCHAR(8) NOT NULL
);

--inserindo os dados na tabela
INSERT INTO usuarios (nome, idade, email, senha) VALUES 
('Aretha Montgomery', 30, 'augue.id.ante@odioAliquam.com', 'a0B13O3L'),
('Camden H. Bartlett', 15, 'turpis.vitae.purus@risusDuisa.ca', 'p3P96F3Q'), 
('Raja W. Coffey', 30, 'raja.feugiat@nonummy.com', 's5F51T7L'),
('Elton D. Olsen', 29, 'auctor@duiFuscediam.edu', 'k5X25B0R'), 
('Shelley E. Frederick', 20, 'raja.feugiat@nonummy.com', 'u2D18F6E');

--alterando o nome de um usuário
UPDATE usuarios SET nome = 'Raja W. Coffey Thomas' WHERE email = 'raja.feugiat@nonummy.com';

--deletando um registro de email duplicado
DELETE FROM usuarios WHERE email = 'raja.feugiat@nonummy.com' AND id = 5;

--alterando a tabela para impedir novos registro duplicados
ALTER TABLE usuarios ADD CONSTRAINT email_unique_usuarios UNIQUE(email);

--inserindo mais dados na tabela
INSERT INTO usuarios (nome, idade, email, senha) VALUES 
('Jermaine G. Sellers', 16, 'ligula.Nullam@tortordictum.co.uk', 'o2P56U9U'),
('James D. Kennedy', 23, 'amet@Nulladignissim.com', 'q6B78V3V'), 
('Amelia S. Harris', 29, 'nec.metus.facilisis@vitaealiquet.edu', 'l4S64Y3A'),
('Joel M. Hartman', 18, 'montes.nascetur@odiotristique.co.uk', 'c4Q27D7O'), 
('Elmo K. Greer', 18, 'risus.Duis@eget.ca', 'e3P92I7R');

--adicionando o campo de situação
ALTER TABLE usuarios ADD column situacao BOOLEAN DEFAULT true;

--inativando um usuário
UPDATE usuarios SET situacao = FALSE WHERE email = 'montes.nascetur@odiotristique.co.uk';

--alterando a senha de um usuário
UPDATE usuarios SET senha = 'k9P31H1O' WHERE email = 'risus.Duis@eget.ca';

--deletando o campo idade e adicionando o campo data_nascimento
ALTER TABLE usuarios DROP COLUMN idade, ADD COLUMN data_nascimento DATE;

--inserindo a data de um usuário nascido em 1991-09-29
UPDATE usuarios SET data_nascimento = to_date ('29/09/1991','dd/mm/yyyy') WHERE email = 'auctor@duiFuscediam.edu';

--inserindo a data de um usuário nascido em 1988-11-02
UPDATE usuarios SET data_nascimento = to_date ('02/11/1988','dd/mm/yyyy') WHERE email = 'nec.metus.facilisis@vitaealiquet.edu';

--deletando todos os usuários sem data de nascimento
DELETE FROM usuarios WHERE data_nascimento IS NULL;

--tornando o campo data_nascimento obrigatório
ALTER TABLE usuarios ALTER COLUMN data_nascimento SET NOT NULL;

--inserindo outros usuários na tabela
INSERT INTO usuarios (nome, data_nascimento, email, senha) VALUES 
('Tate I. Dean', '1989-05-01', 'Nunc@etmagnis.edu', 'd3V25D6Y'),
('Arsenio K. Harmon', '1985-10-23', 'adipiscing.elit@turpis.com', 'm3T58S0C');

--lista tudo de todos os registros da tabela usuarios
SELECT * FROM usuarios;