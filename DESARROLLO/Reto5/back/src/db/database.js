const { Sequelize } = require('sequelize');

const db = new Sequelize('reto5', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = db;