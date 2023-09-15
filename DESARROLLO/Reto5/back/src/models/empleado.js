const {DataTypes} = require('sequelize');
const db = require('../db/database');

const Empleado = db.define('empleado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
});

module.exports = Empleado;