const {DataTypes} = require('sequelize');
const db = require('../db/database');

const Usuario = db.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    contrasena: {
        type: DataTypes.STRING,
    },
});

module.exports = Usuario;