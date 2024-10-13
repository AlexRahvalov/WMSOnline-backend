// WMSOnline-backend/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TelegramStrategy = require('passport-telegram-official').Strategy;
const YandexStrategy = require('passport-yandex').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });
        if (!user) {
            user = await User.create({
                NickName: profile.displayName,
                email: profile.emails[0].value,
                password: null // пароль не нужен для OAuth
            });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.use(new TelegramStrategy({
    botToken: 'YOUR_TELEGRAM_BOT_TOKEN',
}, async (user, done) => {
    try {
        let existingUser = await User.findOne({ where: { email: user.email } });
        if (!existingUser) {
            existingUser = await User.create({
                NickName: user.username,
                email: user.email,
                password: null
            });
        }
        done(null, existingUser);
    } catch (err) {
        done(err, null);
    }
}));

passport.use(new YandexStrategy({
    clientID: 'YOUR_YANDEX_CLIENT_ID',
    clientSecret: 'YOUR_YANDEX_CLIENT_SECRET',
    callbackURL: '/auth/yandex/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });
        if (!user) {
            user = await User.create({
                NickName: profile.displayName,
                email: profile.emails[0].value,
                password: null
            });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
