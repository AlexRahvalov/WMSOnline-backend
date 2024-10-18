// WMSOnline-backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err); // Логируем ошибку на сервере

    const statusCode = res.statusCode ? res.statusCode : 500; // Устанавливаем статус ответа
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Убираем стек ошибок в продакшене
    });
};

module.exports = errorHandler;
