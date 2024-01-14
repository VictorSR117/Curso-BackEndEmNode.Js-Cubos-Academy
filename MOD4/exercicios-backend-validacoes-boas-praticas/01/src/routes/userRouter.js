const express = require('express');
const userRouter = express.Router();

const {
    validationsFromTextForUserRegistration,
    validationsFromTextForUserLogin,
} = require('../middlewares/users/validations');

const {
    authenticateUserPassword,
    generateOneTokenForTheUser
} = require('../middlewares/users/sso/authentication');

const verifyIfUserIsLogged = require('../middlewares/users/login');

const {
    registerOneNewUser,
    verifyUserLogin,
    updateUser
} = require('../controllers/users');


userRouter.post('/usuario', validationsFromTextForUserRegistration, registerOneNewUser);
userRouter.post('/login', validationsFromTextForUserLogin, authenticateUserPassword, generateOneTokenForTheUser);

userRouter.use(verifyIfUserIsLogged);

userRouter.get('/usuario', verifyUserLogin);
userRouter.put('/usuario', updateUser);

module.exports = userRouter;