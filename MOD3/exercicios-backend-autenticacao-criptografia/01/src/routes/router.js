const express = require('express');
const router = express.Router();

const {
    emailFormatValidation,
    validationsFromTextForUserRegistration,
    validationsFromTextForUserLogin,
    verifyIfUserExistis,
    verifyIfUserNotExistis,
} = require('../middlewares/usuarios/validations');

const {
    validationsFromTextForPokemonRegistration,
    verifyExistenceOfUserAndReturnYourId,
    validationForPokemonId
} = require('../middlewares/pokemons/validationsCamps');

const {
    authenticateUserPassword,
    generateOneTokenForTheUser
} = require('../middlewares/usuarios/sso/authentication');

const verifyIfUserIsLogged = require('../middlewares/usuarios/login');

const {
    registerOneNewUser,
    verifyUserLogin,
} = require('../controllers/users');

const {
    registerANewPokemonForTheUser,
    listAllUsersPokemons,
    changePokemonNickname,
    listAUsersPokemon,
    deleteOnePokemon
} = require('../controllers/pokemons');

router.post('/registration', validationsFromTextForUserRegistration, emailFormatValidation, verifyIfUserExistis, registerOneNewUser);
router.post('/login', validationsFromTextForUserLogin, emailFormatValidation, verifyIfUserNotExistis, authenticateUserPassword, generateOneTokenForTheUser);

router.use(verifyIfUserIsLogged);

router.get('/listarUsuario', verifyUserLogin);

router.post('/inserir', validationsFromTextForPokemonRegistration, verifyExistenceOfUserAndReturnYourId, registerANewPokemonForTheUser);
router.get('/listarPokemons', verifyExistenceOfUserAndReturnYourId, listAllUsersPokemons);
router.patch('/alterarApelido/:id', verifyExistenceOfUserAndReturnYourId, validationForPokemonId, changePokemonNickname);
router.get('/listarPokemon/:id', verifyExistenceOfUserAndReturnYourId, validationForPokemonId, listAUsersPokemon);
router.delete('/excluirPokemon/:id', verifyExistenceOfUserAndReturnYourId, validationForPokemonId, deleteOnePokemon);

module.exports = router;