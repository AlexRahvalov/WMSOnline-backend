// WMSOnline-backend/config/corsOptions.js
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Адрес фронтенда из .env
    credentials: true,
};

module.exports = corsOptions;
