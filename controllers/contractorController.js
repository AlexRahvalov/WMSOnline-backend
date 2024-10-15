// WMSOnline-backend/controllers/contractorController.js

const Contractor = require('../models/contractor');

const createContractor = async (req, res) => {
    const { name, address, phone, email, type } = req.body;
    try {
        const contractor = await Contractor.create({ name, address, phone, email, type });
        res.status(201).json({ message: 'Contractor created successfully', contractor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contractor', error: error.message });
    }
};

const getAllContractors = async (req, res) => {
    try {
        const contractors = await Contractor.findAll();
        res.json(contractors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contractors', error: error.message });
    }
};

const getContractorById = async (req, res) => {
    const { id } = req.params;
    try {
        const contractor = await Contractor.findByPk(id);
        if (!contractor) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
        res.json(contractor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contractor', error: error.message });
    }
};

const updateContractor = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, email, type } = req.body;
    try {
        const contractor = await Contractor.findByPk(id);
        if (!contractor) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
        contractor.name = name || contractor.name;
        contractor.address = address || contractor.address;
        contractor.phone = phone || contractor.phone;
        contractor.email = email || contractor.email;
        contractor.type = type || contractor.type;
        await contractor.save();
        res.json({ message: 'Contractor updated successfully', contractor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contractor', error: error.message });
    }
};

const deleteContractor = async (req, res) => {
    const { id } = req.params;
    try {
        const contractor = await Contractor.findByPk(id);
        if (!contractor) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
        await contractor.destroy();
        res.json({ message: 'Contractor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contractor', error: error.message });
    }
};

module.exports = { createContractor, getAllContractors, getContractorById, updateContractor, deleteContractor };
