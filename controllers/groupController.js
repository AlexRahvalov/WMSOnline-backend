// WMSOnline-backend/controllers/groupController.js

const Group = require('../models/group');

const createGroup = async (req, res) => {
    const { name, description } = req.body;
    try {
        const group = await Group.create({ name, description });
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error: error.message });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups', error: error.message });
    }
};

const getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await Group.findByPk(id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group', error: error.message });
    }
};

const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const group = await Group.findByPk(id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.name = name || group.name;
        group.description = description || group.description;
        await group.save();
        res.json({ message: 'Group updated successfully', group });
    } catch (error) {
        res.status(500).json({ message: 'Error updating group', error: error.message });
    }
};

const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await Group.findByPk(id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        await group.destroy();
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group', error: error.message });
    }
};

module.exports = { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup };
