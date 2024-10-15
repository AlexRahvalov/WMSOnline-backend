// WMSOnline-backend/routes/groupRoutes.js

const express = require('express');
const {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController');

const router = express.Router();

router.post('/', createGroup);
router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

module.exports = router;
