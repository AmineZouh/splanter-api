const express = require('express');

const {
    addIrrigation,
    getAllIrrigation,
    getIrrigation,
    updateIrrigation,
    deleteIrrigation
} = require('../controllers/IrrigationController');

const {
    addEtatPlante,
    getAllEtatsPlante,
    getEtatPlante,
    updateEtatPlante,
    deleteEtatPlante
} = require('../controllers/EtatPlanteController');


const {
    addEtatSerre,
    getAllEtatsSerre,
    getEtatSerre,
    updateEtatSerre,
    deleteEtatSerre
} = require('../controllers/EtatSerreController');

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

const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/UtilisateurController');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user-update/:id', updateUser);
router.delete('/user-delete/:id', deleteUser);


router.post('/etatSerre', addEtatSerre);
router.get('/etatsSerre', getAllEtatsSerre);
router.get('/etatSerre/:id', getEtatSerre);
router.put('/etatSerre-update/:id', updateEtatSerre);
router.delete('/etatSerre-delete/:id', deleteEtatSerre);




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