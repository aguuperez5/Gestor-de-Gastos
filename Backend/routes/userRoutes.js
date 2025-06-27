const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login de usuario
router.post('/login', userController.login);

// Registrar nuevo usuario
router.post('/register', userController.register);

module.exports = router;
