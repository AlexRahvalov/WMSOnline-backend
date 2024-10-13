// WMSOnline-backend/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Импортируем sequelize
const bcrypt = require('bcrypt'); // Подключаем bcrypt

const User = sequelize.define('User', {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Хэширование пароля перед сохранением
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
