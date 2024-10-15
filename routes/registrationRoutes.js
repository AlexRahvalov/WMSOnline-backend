// WMSOnline-backend/routes/registrationRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/registrationController');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика

const router = express.Router();


router.post('/register', checkPermissions('register_users'), registerUser); // Проверяем разрешения для регистрации пользователя

module.exports = router;
