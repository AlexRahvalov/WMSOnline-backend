// WMSOnline-backend/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); // Добавляем импорт bcrypt
const router = express.Router();
const User = require('../models/User'); // Импортируем модель пользователя

// Пример маршрута для создания нового пользователя
router.post('/register', async (req, res) => {
    const { nickname, email, password } = req.body;

    try {
        // Проверка, существует ли уже пользователь
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Пользователь с таким email уже существует');
        }

        // Создание нового пользователя
        const newUser = await User.create({
            nickname,
            email,
            password, // Пароль будет автоматически хеширован в модели
        });

        res.status(201).send(`Пользователь ${newUser.nickname} успешно создан`);
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).send('Ошибка при регистрации пользователя');
    }
});

// Пример маршрута для авторизации пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Находим пользователя по email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Пользователь не найден');
        }

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Введенный пароль:', password);
        console.log('Хэшированный пароль из базы:', user.password);
        console.log('Пароли совпадают:', isMatch);

        if (!isMatch) {
            return res.status(400).send('Неверный пароль');
        }

        // Если всё в порядке, отправляем ответ
        res.status(200).send(`Пользователь ${user.nickname} успешно авторизован`);
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        res.status(500).send('Ошибка при авторизации');
    }
});

module.exports = router;
