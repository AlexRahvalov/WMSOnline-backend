// WMSOnline-backend/controllers/userController.js
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { nickname, email, password, confirmPassword } = req.body;

  // Проверка на совпадение паролей
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Пароли не совпадают' });
  }

  try {
    const newUser = await User.create({ nickname, email, password });
    return res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка регистрации', error });
  }
};

module.exports = { registerUser };
