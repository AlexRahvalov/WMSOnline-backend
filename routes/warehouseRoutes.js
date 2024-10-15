// WMSOnline-backend/routes/warehouseRoutes.js

const express = require('express');
const {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
} = require('../controllers/warehouseController');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика

const router = express.Router();

router.post('/', checkPermissions('manage_warehouses'), createWarehouse); // Проверка разрешений
router.get('/', checkPermissions('view_warehouses'), getAllWarehouses); // Проверка разрешений
router.get('/:id', checkPermissions('view_warehouses'), getWarehouseById); // Проверка разрешений
router.put('/:id', checkPermissions('manage_warehouses'), updateWarehouse); // Проверка разрешений
router.delete('/:id', checkPermissions('manage_warehouses'), deleteWarehouse); // Проверка разрешений

module.exports = router;
