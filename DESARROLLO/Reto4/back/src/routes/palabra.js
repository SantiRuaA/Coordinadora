const Palabra = require('../models/palabra');

const router = require('express').Router();
const sequelize = require('sequelize');

router.get('/', async (req, res) => {
    const pal = await Palabra.findAll();
    res.json(pal);
});

router.post('/', async (req, res) => {
    const { palabra, categoriaId } = req.body;
    const pal = await Palabra.create({ palabra, categoriaId });
    res.json(pal);
});

router.get('/random', async (req, res) => {
    try {
        // Utiliza sequelize.fn('RAND') para obtener una palabra aleatoria
        const palabraAleatoria = await Palabra.findOne({
            order: [
                sequelize.fn('RAND')
            ]
        });
        if (palabraAleatoria) {
            selectedWord = palabraAleatoria.palabra.split('');
            res.json(palabraAleatoria);
        } else {
            console.error('No se encontraron palabras en la base de datos.');
        }
    } catch (error) {
        console.error('Error al obtener una palabra aleatoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router