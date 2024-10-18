// WMSOnline-backend/controllers/companyController.js 

const Company = require('../models/company');
const User = require('../models/user');

const createCompany = async (req, res) => {
    const { name, address, phone } = req.body;
    const userId = req.user.id; // Получаем userId из токена

    try {
        const company = await Company.create({ name, address, phone, userId });
        res.status(201).json({ message: 'Компания успешно создана', company });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании компании', error: error.message });
    }
};

const getAllCompanies = async (req, res) => {
    const userId = req.user.id;

    try {
        const companies = await Company.findAll({ where: { userId } }); // Проверка по userId
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении компаний', error: error.message });
    }
};

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const company = await Company.findOne({ where: { id, userId } }); // Проверка по userId
        if (!company) {
            return res.status(404).json({ message: 'Компания не найдена' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении компании', error: error.message });
    }
};

const updateCompany = async (req, res) => {
    const { id } = req.params; // Получаем id компании из параметров
    const { name, address, phone } = req.body; // Получаем данные для обновления
    const userId = req.user.id; // Получаем userId из токена

    try {
        const company = await Company.findOne({ where: { id } }); // Найти компанию по ID

        if (!company) {
            return res.status(404).json({ message: 'Компания не найдена' });
        }

        // Проверяем, является ли текущий пользователь владельцем компании
        if (company.userId !== userId) { 
            return res.status(403).json({ message: 'Вы не можете редактировать эту компанию' }); // Ошибка 403 (Запрещено)
        }

        // Обновляем данные компании
        company.name = name || company.name; // Обновляем название, если передано
        company.address = address || company.address; // Обновляем адрес, если передан
        company.phone = phone || company.phone; // Обновляем телефон, если передан
        await company.save(); // Сохраняем изменения

        res.json({ message: 'Компания успешно обновлена', company });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении компании', error: error.message });
    }
};

const deleteCompany = async (req, res) => {
    const { id } = req.params; // Получаем id компании из параметров
    const userId = req.user.id; // Получаем userId из токена

    try {
        // Сначала ищем компанию по id
        const company = await Company.findOne({ where: { id } });

        // Проверяем, существует ли компания
        if (!company) {
            return res.status(404).json({ message: 'Компания не найдена' });
        }

        // Проверяем, является ли текущий пользователь владельцем компании
        if (company.userId !== userId) { 
            return res.status(403).json({ message: 'Вы не можете удалить эту компанию' }); // Ошибка 403 (Запрещено)
        }

        // Удаляем компанию
        await company.destroy();
        res.json({ message: 'Компания успешно удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении компании', error: error.message });
    }
};

module.exports = { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany };
