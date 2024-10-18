// WMSOnline-backend/controllers/registrationController.js

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const registerUser = [
    // Валидация данных
    body('username').isString().isLength({ min: 3 }).withMessage('Имя пользователя должно содержать минимум 3 символа.'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов.'),
    body('email').isEmail().withMessage('Некорректный формат электронной почты.'),
    body('first_name').isString().notEmpty().withMessage('Имя обязательно.'),
    body('last_name').isString().notEmpty().withMessage('Фамилия обязательна.'),

    async (req, res) => {
        // Проверка наличия ошибок валидации
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, email, first_name, last_name } = req.body;
        try {
            // Проверка на уникальность email
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
            }

            // Хеширование пароля
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ 
                username, 
                password_hash: hashedPassword, 
                email,
                first_name, 
                last_name
            });

            // Успешная регистрация
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован', userId: newUser.id });
        } catch (error) {
            // Обработка ошибок
            res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
        }
    }
];

module.exports = { registerUser };
