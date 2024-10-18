// WMSOnline-backend/routes/contractor.js

const express = require('express');
const Contractor = require('../models/contractor');

const router = express.Router();

// Получить всех подрядчиков
router.get('/', async (req, res) => {
    try {
        const contractors = await Contractor.findAll();
        res.json(contractors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contractors' });
    }
});

// Получить подрядчика по ID
router.get('/:id', async (req, res) => {
    try {
        const contractor = await Contractor.findByPk(req.params.id);
        if (contractor) {
            res.json(contractor);
        } else {
            res.status(404).json({ error: 'Contractor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contractor' });
    }
});

// Создать нового подрядчика
router.post('/', async (req, res) => {
    try {
        const newContractor = await Contractor.create(req.body);
        res.status(201).json(newContractor);
    } catch (error) {
        res.status(400).json({ error: 'Error creating contractor' });
    }
});

// Обновить подрядчика
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Contractor.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedContractor = await Contractor.findByPk(req.params.id);
            res.json(updatedContractor);
        } else {
            res.status(404).json({ error: 'Contractor not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating contractor' });
    }
});

// Удалить подрядчика
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Contractor.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contractor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting contractor' });
    }
});

module.exports = router;
