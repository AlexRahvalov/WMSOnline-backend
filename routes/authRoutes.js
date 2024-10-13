// WMSOnline-backend/routes/authRoutes.js

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google authentication routes
if (process.env.ENABLE_GOOGLE_AUTH === 'true') {
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/'); // или куда нужно
    });
}

// Telegram authentication routes
if (process.env.ENABLE_TELEGRAM_AUTH === 'true') {
    router.get('/telegram', passport.authenticate('telegram'));
    router.get('/telegram/callback', passport.authenticate('telegram', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/'); // или куда нужно
    });
}

// Yandex authentication routes
if (process.env.ENABLE_YANDEX_AUTH === 'true') {
    router.get('/yandex', passport.authenticate('yandex', { scope: ['login:info', 'login:mobile'] }));
    router.get('/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/'); // или куда нужно
    });
}

module.exports = router;
