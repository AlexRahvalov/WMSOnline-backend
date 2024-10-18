// WMSOnline-backend/routes/warehouse.js

const express = require('express');
const Warehouse = require('../models/warehouse');

const router = express.Router();

// Получить все склады
router.get('/', async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching warehouses' });
    }
});

// Получить склад по ID
router.get('/:id', async (req, res) => {
    try {
        const warehouse = await Warehouse.findByPk(req.params.id);
        if (warehouse) {
            res.json(warehouse);
        } else {
            res.status(404).json({ error: 'Warehouse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching warehouse' });
    }
});

// Создать новый склад
router.post('/', async (req, res) => {
    try {
        const newWarehouse = await Warehouse.create(req.body);
        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(400).json({ error: 'Error creating warehouse' });
    }
});

// Обновить склад
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Warehouse.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedWarehouse = await Warehouse.findByPk(req.params.id);
            res.json(updatedWarehouse);
        } else {
            res.status(404).json({ error: 'Warehouse not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating warehouse' });
    }
});

// Удалить склад
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Warehouse.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Warehouse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting warehouse' });
    }
});

module.exports = router;
