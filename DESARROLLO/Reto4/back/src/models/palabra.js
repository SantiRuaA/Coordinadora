const {DataTypes} = require('sequelize');
const db = require('../db/database');
const Categoria = require('./categoria');

const Palabra = db.define('palabra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    palabra: {
        type: DataTypes.STRING,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id'
        }
    },
});

module.exports = Palabra;