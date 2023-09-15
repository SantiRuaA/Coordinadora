const {DataTypes} = require('sequelize');
const db = require('../db/database');
const Empleado = require('./empleado');
const Premio = require('./premio');

const Puntaje = db.define('puntaje', {
    idPuntaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idEmpleado: {
        type: DataTypes.INTEGER,
        references: {
            model: Empleado,
            key: 'idEmpleado'
        }
    },
    idPremio: {
        type: DataTypes.INTEGER,
        references: {
            model: Premio,
            key: 'idPremio'
        }
    },
    puntaje: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Puntaje;