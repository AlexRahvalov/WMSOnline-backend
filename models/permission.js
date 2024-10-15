// WMSOnline-backend/models/permission.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'permissions',
    timestamps: false
});

module.exports = Permission;
