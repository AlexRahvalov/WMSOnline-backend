// WMSOnline-backend/routes/companyRoutes.js 

const express = require('express');
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController');

const authenticateToken = require('../middleware/authMiddleware'); // Исправлено на authenticateToken

const router = express.Router();

// Создать новую компанию
router.post('/', authenticateToken, createCompany); // Исправлено

// Получить все компании текущего пользователя
router.get('/', authenticateToken, getAllCompanies); // Исправлено

// Получить компанию по ID
router.get('/:id', authenticateToken, getCompanyById); // Исправлено

// Обновить компанию
router.put('/:id', authenticateToken, updateCompany); // Исправлено

// Удалить компанию
router.delete('/:id', authenticateToken, deleteCompany); // Исправлено

module.exports = router;
