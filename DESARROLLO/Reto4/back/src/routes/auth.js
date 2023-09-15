const Usuario = require('../models/usuario');
const router = require('express').Router();



router.post('/login', async (req, res) => {

    const { nombre, contrasena, id } = req.body;

    const user = await Usuario.findOne({ where: { nombre, contrasena, id } });

    if (!user) {
        //devolver error 400
        return res.status(400).json({
            status: 'error',
            msj: 'Usuario, contraseña o id incorrectos',
        });
    }

    res.json({
        status: 'ok',
        msj: 'Usuario logueado correctamente',
    });

});

module.exports = router