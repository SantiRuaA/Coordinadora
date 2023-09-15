const ppt = require('../models/PPT');
const usuario = require('../models/usuario');

const router = require('express').Router();

router.post('/guardarPuntaje', async (req, res) => {
    const {puntaje, numIntentos, fecha, usuarioId} = req.body;

    const pptC = await ppt.create({puntaje, numIntentos, fecha, usuarioId})
    res.json({
        status: 'ok',
        msj: 'Puntaje creado correctamente',
    });
});

router.get('/', async (req, res) => {
    const pptC = await ppt.findAll({
    });
    res.json({
        status: 'ok',
        pptC
    });
});

router.get('/obtenerPuntaje/:id', async (req, res) => {
    const pptC = await ppt.findAll({
        where: {
            usuarioId: req.params.id
        },
    });
    res.json({
        status: 'ok',
        pptC
    });
});

//obtener nombre de los usuarios de cada id

router.get('/obtenerNombre/:id', async (req, res) => {
    const pptC = await usuario.findAll({
        where: {
            id: req.params.id
        },
        attributes: ['nombre']
    });
    res.json({
        status: 'ok',
        pptC
    });
});

//obtener un ranking de los que mas puntaje tienen
router.get('/obtenerRanking', async (req, res) => {
    const pptC = await ppt.findAll({
        //se manda con el nombre asociado a ese id
        attributes: ['usuarioId', 'puntaje'],
        order: [
            ['puntaje', 'DESC'] //orden descendente
        ],
        limit: 5, //limito a 5 resultados
    });
    res.json({
        status: 'ok',
        pptC
    });
});



module.exports = router;