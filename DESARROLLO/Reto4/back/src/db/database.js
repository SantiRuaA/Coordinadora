const { Sequelize } = require('sequelize');

const db = new Sequelize('reto4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = db;