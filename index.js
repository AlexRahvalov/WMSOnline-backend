// WMSOnline-backend/index.js
const express = require('express'); 
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes');
const { sequelize, testConnection } = require('./config/database'); // Импортируем sequelize и testConnection

dotenv.config();

const app = express();
app.use(express.json()); // Middleware для парсинга JSON

// Настройка сессий
app.use(session({
    secret: 'ваш_секретный_ключ',
    resave: false,
    saveUninitialized: true,
}));

// Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

// Настройка стратегий аутентификации
if (process.env.ENABLE_GOOGLE_AUTH === 'true') {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));
}

if (process.env.ENABLE_TELEGRAM_AUTH === 'true') {
    passport.use(new TelegramStrategy({
        botToken: process.env.TELEGRAM_BOT_TOKEN,
    }, (message, done) => {
        return done(null, message);
    }));
}

if (process.env.ENABLE_YANDEX_AUTH === 'true') {
    passport.use(new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: '/auth/yandex/callback'
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));
}

// Сериализация и десериализация пользователя
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Используйте маршруты аутентификации
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Запуск сервера и синхронизация с базой данных
const PORT = process.env.PORT || 3000;

testConnection() // Проверяем соединение с базой данных
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Ошибка при запуске сервера:', error);
    });
