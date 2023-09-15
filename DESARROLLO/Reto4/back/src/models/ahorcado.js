const {DataTypes} = require('sequelize');
const db = require('../db/database');
const Usuario = require('./usuario');

const Ahorcado = db.define('ahorcado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    puntaje: {
        type: DataTypes.INTEGER,
    },
    numIntentos: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    
});

module.exports = Ahorcado;