const Puntaje = require('../models/puntaje');
const Empleado = require('../models/empleado');
const Premio = require('../models/premio');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const puntajes = await Puntaje.findAll();
    res.json(puntajes);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const puntaje = await Puntaje.findByPk(id);
    res.json(puntaje);
});

router.post('/', async (req, res) => {
    const {idPuntaje, idEmpleado, idPremio, puntaje} = req.body;

    const puntajeC = await Puntaje.create({idPuntaje, idEmpleado, idPremio, puntaje})
    res.json({
        status: 'ok',
        msj: 'Puntaje creado correctamente',
        Puntaje: puntajeC
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {idPuntaje, idEmpleado, idPremio, puntaje} = req.body;
    const puntajeC = await Puntaje.findByPk(idPuntaje);

    const empleado = await Empleado.findByPk(idEmpleado);
    const premio = await Premio.findByPk(idPremio);

    await puntajeC.update({idPuntaje, idEmpleado, idPremio, puntaje}, {where: {idPuntaje: id}});
    res.json({
        status: 'ok',
        msj: 'Puntaje actualizado correctamente',
        Puntaje: puntajeC
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const puntajeC = await Puntaje.findByPk(id);
    await puntajeC.destroy();
    res.json({
        status: 'ok',
        msj: 'Puntaje eliminado correctamente',
    });
});

module.exports = router;
