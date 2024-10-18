// WMSOnline-backend/controllers/userProfileController.js
const User = require('../models/user');

const getUserProfile = async (req, res, next) => {
    // Получаем ID пользователя из параметров маршрута или из токена
    const userId = req.params.id || req.user.id;

    try {
        const user = await User.findByPk(userId, {
            attributes: ['username', 'email', 'first_name', 'last_name'], // Укажите нужные поля
        });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error); // Передаем ошибку в middleware обработки ошибок
    }
};

const updateUserProfile = async (req, res, next) => {
    const userId = req.params.id; // Получаем ID пользователя из параметров маршрута
    const { first_name, last_name, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Обновление полей профиля
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'Профиль пользователя обновлён успешно', user });
    } catch (error) {
        next(error); // Передаем ошибку в middleware обработки ошибок
    }
};

module.exports = { getUserProfile, updateUserProfile };
