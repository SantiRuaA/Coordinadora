const {DataTypes} = require('sequelize');
const db = require('../db/database');

const Premio = db.define('premio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    puntos: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Premio;