// WMSOnline-backend/index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Импортируем маршруты
const { sequelize } = require('./config/database'); // Импортируем sequelize
require('dotenv').config(); // Загружаем переменные окружения

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Для парсинга JSON-тел
app.use('/api', userRoutes); // Подключаем маршруты

// Запуск сервера
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    })
    .catch(err => console.error('Ошибка соединения с базой данных:', err));
