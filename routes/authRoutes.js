// WMSOnline-backend/routes/authRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/authController'); // Импорт контроллера
const router = express.Router();

// Определение маршрута для входа
router.post('/login', loginUser);

module.exports = router;
