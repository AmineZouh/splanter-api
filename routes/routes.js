const express = require('express');


const {
    addEnvironnement,
    getAllEnvironnements,
    getEnvironnement,
    updateEnvironnement,
    deleteEnvironnement
} = require('../controllers/EnvironnementController');

const {
    addPlante,
    getAllPlantes,
    getPlante,
    updatePlante,
    deletePlante
} = require('../controllers/PlanteController');

const router = express.Router();



router.post('/plante', addPlante);
router.get('/plantes', getAllPlantes);
router.get('/plante/:id', getPlante);
router.put('/plante/:id', updatePlante);
router.delete('/plante/:id', deletePlante);

router.post('/environnement', addEnvironnement);
router.get('/environnements', getAllEnvironnements);
router.get('/environnement/:id', getEnvironnement);
router.put('/environnement/:id', updateEnvironnement);
router.delete('/environnement/:id', deleteEnvironnement);


module.exports = {
    routes: router
}