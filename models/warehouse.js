const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const Company = require('./company'); // Импортируем модель компании

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
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'companies', // Ссылка на таблицу компаний
            key: 'id'          // Ссылка на ключ id в таблице компаний
        }
    }
}, {
    tableName: 'warehouses',
    timestamps: false // Если не нужно отслеживать время создания и обновления
});

// Определяем отношения
Warehouse.belongsTo(Company, { foreignKey: 'companyId' }); // Один склад принадлежит одной компании
Company.hasMany(Warehouse, { foreignKey: 'companyId' }); // Одна компания может иметь много складов

module.exports = Warehouse;
