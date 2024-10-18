// WMSOnline-backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        console.log('Токен отсутствует');
        return res.sendStatus(401); // Если токен отсутствует
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log('Ошибка при верификации токена:', err.message);
            return res.sendStatus(403); // Неправильный токен
        }

        try {
            const user = await User.findByPk(decoded.userId); // userId в токене
            if (!user) {
                console.log('Пользователь не найден для ID:', decoded.userId);
                return res.sendStatus(404); // Пользователь не найден
            }

            req.user = user; // Добавляем пользователя в объект запроса
            next(); // Переходим к следующему обработчику
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error.message);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });
};

module.exports = authenticateToken;
