// WMSOnline-backend/models/product.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Group = require('./group'); // Связь с группой товаров

const Product = sequelize.define('Product', {
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
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    }
}, {
    tableName: 'products',
    timestamps: false
});

// Связь товара с группой товаров
Product.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });

module.exports = Product;
