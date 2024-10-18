// WMSOnline-backend/app.js 
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Импорт настроек CORS
const corsOptions = require('./config/corsOptions');

// Подключаем маршруты
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const groupRoutes = require('./routes/groupRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');

const app = express();
app.use(cors(corsOptions)); // Используем настройки CORS
app.use(express.json()); // Для обработки JSON

// Подключение маршрутов
app.use('/api', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Подключение маршрутов пользователей
app.use('/api/user/profile', userProfileRoutes); // Подключение маршрутов профиля пользователя
app.use('/api/register', registrationRoutes);
app.use('/api/warehouses', warehouseRoutes);

module.exports = app; // Экспортируем приложение
