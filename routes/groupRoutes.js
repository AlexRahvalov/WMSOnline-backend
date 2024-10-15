// WMSOnline-backend/routes/groupRoutes.js

const express = require('express');
const {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика

const router = express.Router();

// Проверяем разрешения для создания группы
router.post('/', checkPermissions('create_groups'), createGroup);

// Проверяем разрешения для получения списка групп
router.get('/', checkPermissions('view_groups'), getAllGroups);

// Проверяем разрешения для получения группы по ID
router.get('/:id', checkPermissions('view_groups'), getGroupById);

// Проверяем разрешения для обновления группы
router.put('/:id', checkPermissions('edit_groups'), updateGroup);

// Проверяем разрешения для удаления группы
router.delete('/:id', checkPermissions('delete_groups'), deleteGroup);

module.exports = router;
