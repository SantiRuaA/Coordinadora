const Empleado = require('../models/empleado');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const empleados = await Empleado.findAll();
    res.json(empleados);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const empleado = await Empleado.findByPk(id);
    res.json(empleado);
});

router.post('/', async (req, res) => {
    const {idEmpleado, nombre, telefono, correo, direccion} = req.body;

    const empleadoC = await Empleado.create({idEmpleado, nombre, telefono, correo, direccion})
    res.json({
        status: 'ok',
        msj: 'Empleado creado correctamente',
        Empleado: empleadoC
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {idEmpleado, nombre, telefono, correo, direccion} = req.body;

    const empleadoU = await Empleado.findByPk(idEmpleado);

    await empleadoU.update({idEmpleado, nombre, telefono, correo, direccion}, {where: {id}})
    res.json({
        status: 'ok',
        msj: 'Empleado actualizado correctamente',
        Empleado: empleadoU
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const empleadoD = await Empleado.findByPk(id);

    await empleadoD.destroy()
    res.json({
        status: 'ok',
        msj: 'Empleado eliminado correctamente',
    });
});

module.exports = router;