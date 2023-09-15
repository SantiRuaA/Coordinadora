const Categoria = require('../models/categoria');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const cat = await Categoria.findAll();
    res.json(cat);
});

router.post('/', async (req, res) => {
    const { nombre } = req.body;
    const cat = await Categoria.create({ nombre });
    res.json(cat);
});

module.exports = router