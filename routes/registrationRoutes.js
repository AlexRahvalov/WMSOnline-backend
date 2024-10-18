// WMSOnline-backend/routes/registrationRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/registrationController'); // Импорт контроллера
const router = express.Router();

// Определение маршрута для регистрации
router.post('/', registerUser);

module.exports = router;
