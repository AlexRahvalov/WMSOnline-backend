// WMSOnline-backend/routes/contractorRoutes.js

const express = require('express');
const {
    createContractor,
    getAllContractors,
    getContractorById,
    updateContractor,
    deleteContractor
} = require('../controllers/contractorController');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика
const router = express.Router();

router.post('/', checkPermissions('create_contractors'), createContractor);// Проверяем разрешения для создания подрядчика
router.get('/', checkPermissions('view_contractors'), getAllContractors);// Проверяем разрешения для получения списка подрядчиков
router.get('/:id', checkPermissions('view_contractors'), getContractorById);// Проверяем разрешения для получения подрядчика по ID
router.put('/:id', checkPermissions('edit_contractors'), updateContractor);// Проверяем разрешения для обновления подрядчика
router.delete('/:id', checkPermissions('delete_contractors'), deleteContractor);// Проверяем разрешения для удаления подрядчика

module.exports = router;
