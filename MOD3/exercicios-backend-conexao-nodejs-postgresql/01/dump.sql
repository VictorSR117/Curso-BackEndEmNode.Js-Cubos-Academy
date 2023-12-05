CREATE DATABASE biblioteca;

CREATE TABLE autores(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    idade INT
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    genero TEXT,
    editora TEXT NOT NULL,
    data_publicacao DATE NOT NULL,
    id_autor INTEGER REFERENCES autores(id)
);