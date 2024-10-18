// WMSOnline-backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/user');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

// Получить всех пользователей
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователей', error: error.message });
    }
});

// Получить пользователя по ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователя', error: error.message });
    }
});

// Создать нового пользователя
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при создании пользователя', error: error.message });
    }
});

// Обновить пользователя
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении пользователя', error: error.message });
    }
});

// Удалить пользователя
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователя', error: error.message });
    }
});

// Обработчик ошибок
router.use(errorHandler);

module.exports = router;
