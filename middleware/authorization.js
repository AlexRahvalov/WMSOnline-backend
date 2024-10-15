// WMSOnline-backend/middleware/authorization.js

const User = require('../models/user');
const Role = require('../models/role');

const checkPermissions = (permission) => {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.userId, {
                include: {
                    model: Role,
                    as: 'role'
                }
            });

            if (!user) {
                return res.status(403).json({ message: 'Access denied' });
            }

            const permissions = user.role.permissions;
            if (permissions && permissions.includes(permission)) {
                return next();
            } else {
                return res.status(403).json({ message: 'Access denied' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error checking permissions', error: error.message });
        }
    };
};

module.exports = { checkPermissions };
