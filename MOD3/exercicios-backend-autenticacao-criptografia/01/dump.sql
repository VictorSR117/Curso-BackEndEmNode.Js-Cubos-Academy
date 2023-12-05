CREATE DATABASE catalogo_pokemons;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
);

CREATE TABLE pokemons(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    nome TEXT NOT NULL,
    habilidades TEXT NOT NULL,
    imagem TEXT,
    apelido TEXT
);