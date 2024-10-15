// WMSOnline-backend/models/contractor.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Contractor = sequelize.define('Contractor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('supplier', 'customer'),
        allowNull: false
    }
}, {
    tableName: 'contractors',
    timestamps: false
});

module.exports = Contractor;
