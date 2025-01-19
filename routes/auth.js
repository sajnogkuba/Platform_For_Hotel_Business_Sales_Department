const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require("../controllers/userController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/currentUser', userController.getCurrentUser);

module.exports = router;