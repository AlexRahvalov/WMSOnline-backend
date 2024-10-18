// WMSOnline-backend/routes/group.js

const express = require('express');
const Group = require('../models/group');

const router = express.Router();

// Получить все группы
router.get('/', async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching groups' });
    }
});

// Получить группу по ID
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching group' });
    }
});

// Создать новую группу
router.post('/', async (req, res) => {
    try {
        const newGroup = await Group.create(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ error: 'Error creating group' });
    }
});

// Обновить группу
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Group.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedGroup = await Group.findByPk(req.params.id);
            res.json(updatedGroup);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating group' });
    }
});

// Удалить группу
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Group.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting group' });
    }
});

module.exports = router;
