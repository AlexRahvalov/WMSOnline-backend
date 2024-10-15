// WMSOnline-backend/models/rolePermission.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Role = require('./role');
const Permission = require('./permission');

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    }
}, {
    tableName: 'role_permissions',
    timestamps: false
});

// Связи
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

module.exports = RolePermission;
