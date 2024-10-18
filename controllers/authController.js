// WMSOnline-backend/controllers/authController.js

const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Проверка наличия email и password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email и пароль обязательны.' });
    }

    try {
        // Поиск пользователя по электронной почте
        const user = await User.findOne({ where: { email } });
        
        // Проверка существования пользователя
        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден.' });
        }

        // Проверка совпадения пароля
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Генерация JWT токена
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Возврат успешного ответа с токеном
        res.json({ message: 'Вход выполнен успешно', token });
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ message: 'Ошибка при входе', error: error.message });
    }
};

module.exports = { loginUser };
