const {DataTypes} = require('sequelize');
const db = require('../db/database');

const Premio = db.define('premio', {
    idPremio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    }
});

module.exports = Premio;