// WMSOnline-backend/controllers/roleController.js

const Role = require('../models/role');
const Permission = require('../models/permission');

const createRole = async (req, res) => {
    const { name, description } = req.body;
    try {
        const role = await Role.create({ name, description });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
};

const assignPermissionToRole = async (req, res) => {
    const { roleId, permissionId } = req.body;
    try {
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);
        if (!role || !permission) {
            return res.status(404).json({ message: 'Role or Permission not found' });
        }
        await role.addPermission(permission);
        res.status(200).json({ message: 'Permission assigned to role' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning permission', error: error.message });
    }
};

module.exports = { createRole, assignPermissionToRole };
