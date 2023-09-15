const Usuario = require('../models/usuario');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const users = await Usuario.findAll();
    res.json(users);
});

router.post('/', async (req, res) => {
    const {id, nombre, contrasena} = req.body;

    const userC = await Usuario.create({id, nombre, contrasena})
    res.json({
        status: 'ok',
        msj: 'Usuario creado correctamente',
    });
});

module.exports = router;