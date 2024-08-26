const sequelize = require('../config/dbConfig');
const { Model, DataTypes } = require('sequelize');

class Expenses extends Model {};

Expenses.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Expenses',
    tableName: 'expenses',
    timestamps: true
});

module.exports = Expenses;