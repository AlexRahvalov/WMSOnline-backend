// WMSOnline-backend/index.js

const express = require('express');
const { sequelize } = require('./models');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/authRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const groupRoutes = require('./routes/groupRoutes');
const productRoutes = require('./routes/productRoutes');
const contractorRoutes = require('./routes/contractorRoutes');

const app = express();
app.use(express.json());

// Маршруты
app.use('/api', registrationRoutes);
app.use('/api', authRoutes);
app.use('/api/warehouses', warehouseRoutes); // Добавили маршруты складов
app.use('/api/groups', groupRoutes); // Добавили маршруты групп товаров
app.use('/api/products', productRoutes); // Добавили маршруты товаров
app.use('/api/contractors', contractorRoutes); // Добавили маршруты контрагентов

// Запуск сервера
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log('Error: ', err));
