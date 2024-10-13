// WMSOnline-backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mariadb', // или 'mysql', если вы используете MySQL
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно установлено.');
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
  }
};

module.exports = { sequelize, testConnection }; // Экспортируем sequelize и testConnection
