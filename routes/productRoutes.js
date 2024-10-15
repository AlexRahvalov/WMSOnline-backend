// WMSOnline-backend/routes/productRoutes.js

const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { checkPermissions } = require('../middleware/permissions'); // Импорт промежуточного обработчика

const router = express.Router();

// Проверяем разрешения для создания продукта
router.post('/', checkPermissions('manage_products'), createProduct);

// Проверяем разрешения для получения списка продуктов
router.get('/', checkPermissions('view_products'), getAllProducts);

// Проверяем разрешения для получения продукта по ID
router.get('/:id', checkPermissions('view_products'), getProductById);

// Проверяем разрешения для обновления продукта
router.put('/:id', checkPermissions('manage_products'), updateProduct);

// Проверяем разрешения для удаления продукта
router.delete('/:id', checkPermissions('manage_products'), deleteProduct);

module.exports = router;
