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
    getAllEtatPlante,
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

router.post('/irrigation', addIrrigation);
router.get('/irrigations', getAllIrrigation);
router.get('/irrigation/:id', getIrrigation);
router.put('/irrigation/:id', updateIrrigation);
router.delete('/irrigation/:id', deleteIrrigation);

router.post('/etatPlante', addEtatPlante);
router.get('/etatPlantes', getAllEtatPlante);
router.get('/etatPlante/:id', getEtatPlante);
router.put('/etatPlante/:id', updateEtatPlante);
router.delete('/etatPlante/:id', deleteEtatPlante);


module.exports = {
    routes: router
}