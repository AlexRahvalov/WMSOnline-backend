// WMSOnline-backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Проверяем, что пользователь существует
        const user = await User.findOne({ where: { username } });
        // Проверяем введённый пароль с хэшированным паролем в базе данных
        if (!user || !await bcrypt.compare(password, user.password_hash)) { // исправлено с user.password на user.password_hash
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Генерируем JWT токен
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { loginUser };
