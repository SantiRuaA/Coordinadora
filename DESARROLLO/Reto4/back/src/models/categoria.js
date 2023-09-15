const {DataTypes} = require('sequelize');
const db = require('../db/database');

const Categoria = db.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
});

module.exports = Categoria;