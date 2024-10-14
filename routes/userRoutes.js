// WMSOnline-backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Импортируем модель пользователя
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация
router.post('/register', async (req, res) => {
    const { nickname, email, password } = req.body;

    try {
        const newUser = await User.create({ nickname, email, password });
        res.status(201).json({ message: 'Пользователь зарегистрирован!', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Ошибка регистрации. Проверьте ваши данные.' });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Ошибка входа. Проверьте ваши данные.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Успешный вход!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
});

module.exports = router;
