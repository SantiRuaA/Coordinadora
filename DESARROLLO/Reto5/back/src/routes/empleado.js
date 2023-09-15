const Empleado = require('../models/empleado');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const empleados = await Empleado.findAll();
    res.json(empleados);
});

router.post('/', async (req, res) => {
    const {id, nombre, telefono, correo, direccion} = req.body;

    const empleadoC = await Empleado.create({id, nombre, telefono, correo, direccion})
    res.json({
        status: 'ok',
        msj: 'Empleado creado correctamente',
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, telefono, correo, direccion} = req.body;

    const empleadoU = await Empleado.update({nombre, telefono, correo, direccion}, {where: {id}})
    res.json({
        status: 'ok',
        msj: 'Empleado actualizado correctamente',
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const empleadoD = await Empleado.destroy({where: {id}})
    res.json({
        status: 'ok',
        msj: 'Empleado eliminado correctamente',
    });
});

module.exports = router;