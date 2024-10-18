// WMSOnline-backend/routes/userProfileRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Получить профиль пользователя по ID или по токену
router.get('/:id?', authenticateToken, getUserProfile); // ID параметр не обязателен

// Обновить профиль пользователя
router.put('/:id', authenticateToken, updateUserProfile); // Изменение маршрута

module.exports = router;
