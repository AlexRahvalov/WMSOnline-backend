// WMSOnline-backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Загружаем переменные окружения из .env

// Создание экземпляра Sequelize с настройками подключения
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // Имя базы данных
  process.env.MYSQL_USER,     // Пользователь
  process.env.MYSQL_PASS,     // Пароль
  {
    host: process.env.MYSQL_HOST, // Хост
    port: process.env.MYSQL_PORT, // Порт
    dialect: 'mariadb',            // Диалект базы данных
  }
);

// Проверка подключения
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно.');
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    process.exit(1); // Завершение процесса с кодом ошибки
  }
};

// Экспортируем экземпляр Sequelize и функцию проверки подключения
module.exports = { sequelize, testConnection };
