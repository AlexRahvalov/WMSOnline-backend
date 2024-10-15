// WMSOnline-backend/controllers/registrationController.js

const bcrypt = require('bcryptjs');
const User = require('../models/user');

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Устанавливаем значение роли по умолчанию, если оно не указано
        const role = req.body.role || 'worker';
        // Создаем нового пользователя с ролью по умолчанию
        const newUser = await User.create({ username, password_hash: hashedPassword, email, role });
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

module.exports = { registerUser };
