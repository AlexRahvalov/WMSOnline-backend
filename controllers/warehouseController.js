// WMSOnline-backend/controllers/warehouseController.js

const Warehouse = require('../models/warehouse');

const createWarehouse = async (req, res) => {
    const { name, location } = req.body; // Убрано поле capacity
    try {
        const warehouse = await Warehouse.create({ name, location }); // Убрано поле capacity
        res.status(201).json({ message: 'Warehouse created successfully', warehouse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating warehouse', error: error.message });
    }
};

const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll(); // Запрос без поля capacity
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching warehouses', error: error.message });
    }
};

const getWarehouseById = async (req, res) => {
    const { id } = req.params;
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching warehouse', error: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body; // Убрано поле capacity
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        warehouse.name = name || warehouse.name;
        warehouse.location = location || warehouse.location; // Убрано поле capacity
        await warehouse.save();
        res.json({ message: 'Warehouse updated successfully', warehouse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating warehouse', error: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    const { id } = req.params;
    try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        await warehouse.destroy();
        res.json({ message: 'Warehouse deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting warehouse', error: error.message });
    }
};

module.exports = { createWarehouse, getAllWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse };
