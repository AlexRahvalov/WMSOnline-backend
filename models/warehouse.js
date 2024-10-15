// WMSOnline-backend/models/warehouse.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Warehouse = sequelize.define('Warehouse', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'warehouses',
    timestamps: false
});

module.exports = Warehouse;
