// WMSOnline-backend/routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика

// Создание роли
router.post('/', checkPermissions('manage_roles'), async (req, res) => { // Проверка разрешений
    const { name, permissions } = req.body;
    try {
        const newRole = await Role.create({ name, permissions });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
});

// Получение всех ролей
router.get('/', checkPermissions('view_roles'), async (req, res) => { // Проверка разрешений
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
});

// Обновление роли
router.put('/:id', checkPermissions('manage_roles'), async (req, res) => { // Проверка разрешений
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        role.name = name;
        role.permissions = permissions;
        await role.save();
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
});

// Удаление роли
router.delete('/:id', checkPermissions('manage_roles'), async (req, res) => { // Проверка разрешений
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        await role.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
});

module.exports = router;
