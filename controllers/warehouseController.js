// WMSOnline-backend/controllers/warehouseController.js

const Warehouse = require('../models/warehouse');
const Company = require('../models/company'); // Импортируем модель компании

const createWarehouse = async (req, res) => {
    const { name, location, companyId } = req.body;
    try {
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Проверка, является ли пользователь владельцем компании
        if (company.userId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to create a warehouse for this company' });
        }

        const warehouse = await Warehouse.create({ name, location, companyId });
        res.status(201).json({ message: 'Склад успешно создан', warehouse });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании склада', error: error.message });
    }
};

const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll(); // Запрос без поля capacity
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении складов', error: error.message });
    }
};

const getWarehouseById = async (req, res) => {
    const { id } = req.params;
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Склад не найден' });
        }

        // Проверка, имеет ли пользователь доступ к этому складу
        const company = await Company.findByPk(warehouse.companyId);
        if (company.userId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to view this warehouse' });
        }

        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении склада', error: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Склад не найден' });
        }

        // Проверка, имеет ли пользователь доступ к этому складу
        const company = await Company.findByPk(warehouse.companyId);
        if (company.userId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this warehouse' });
        }

        warehouse.name = name || warehouse.name;
        warehouse.location = location || warehouse.location;
        await warehouse.save();
        res.json({ message: 'Склад успешно обновлён', warehouse });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении склада', error: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    const { id } = req.params;
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Склад не найден' });
        }

        // Проверка, имеет ли пользователь доступ к этому складу
        const company = await Company.findByPk(warehouse.companyId);
        if (company.userId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this warehouse' });
        }

        await warehouse.destroy();
        res.json({ message: 'Склад успешно удалён' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении склада', error: error.message });
    }
};

module.exports = { createWarehouse, getAllWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse };
