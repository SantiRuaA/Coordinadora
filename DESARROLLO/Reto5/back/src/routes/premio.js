const Premio = require('../models/premio');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const premios = await Premio.findAll();
    res.json(premios);
});

router.post('/', async (req, res) => {
    const {id, nombre, descripcion, puntos} = req.body;

    const premioC = await Premio.create({id, nombre, descripcion, puntos})
    res.json({
        status: 'ok',
        msj: 'Premio creado correctamente',
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, puntos} = req.body;

    const premioU = await Premio.update({nombre, descripcion, puntos}, {where: {id}})
    res.json({
        status: 'ok',
        msj: 'Premio actualizado correctamente',
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const premioD = await Premio.destroy({where: {id}})
    res.json({
        status: 'ok',
        msj: 'Premio eliminado correctamente',
    });
});

module.exports = router;