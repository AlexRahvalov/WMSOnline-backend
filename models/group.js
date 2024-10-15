// WMSOnline-backend/models/group.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'groups',
    timestamps: false
});

module.exports = Group;
