// WMSOnline-backend/routes/contractorRoutes.js

const express = require('express');
const {
    createContractor,
    getAllContractors,
    getContractorById,
    updateContractor,
    deleteContractor
} = require('../controllers/contractorController');

const router = express.Router();

router.post('/', createContractor);
router.get('/', getAllContractors);
router.get('/:id', getContractorById);
router.put('/:id', updateContractor);
router.delete('/:id', deleteContractor);

module.exports = router;
