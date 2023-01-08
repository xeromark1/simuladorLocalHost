const { Router } = require('express');
const router = Router();

const { getCarreras, getRamos, getSecciones, getTodasSecciones } = require('../controllers/index.controller');

router.get('/carreras', getCarreras);

router.get('/ramos/:id', getRamos);
//router.post('/users', createUser);
router.get('/secciones/:carrera/:ramo', getSecciones);
router.get('/todassecciones/:carrera', getTodasSecciones);

module.exports = router;