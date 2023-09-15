const Premio = require('../models/premio');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const premios = await Premio.findAll();
    res.json(premios);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const premio = await Premio.findByPk(id);
    res.json(premio);
});

router.post('/', async (req, res) => {
    const {idPremio, nombre, descripcion} = req.body;

    const premioC = await Premio.create({idPremio, nombre, descripcion})
    res.json({
        status: 'ok',
        msj: 'Premio creado correctamente',
        Premio: premioC
    });
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {idPremio, nombre, descripcion} = req.body;

    const premioU = await Premio.findByPk(idPremio);

    await premioU.update({idPremio, nombre, descripcion}), {where: {id}}
    res.json({
        status: 'ok',
        msj: 'Premio actualizado correctamente',
        Premio: premioU
    });
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const premioD = await Premio.findByPk(id);

    await premioD.destroy()
    res.json({
        status: 'ok',
        msj: 'Premio eliminado correctamente',
    });
});

module.exports = router;