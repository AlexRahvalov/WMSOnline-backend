// WMSOnline-backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database'); // Импортируем подключение

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Вы можете добавить другие маршруты здесь или сделать всё в одном месте

// Запуск сервера и проверка подключения к базе данных
const startServer = async () => {
  await testConnection(); // Проверка подключения
  try {
    await sequelize.sync(); // Синхронизация базы данных
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
    process.exit(1); // Завершение процесса с кодом ошибки
  }
};

startServer(); // Запуск сервера
