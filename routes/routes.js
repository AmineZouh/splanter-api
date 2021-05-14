const express = require('express');

const {
    addDateHeure,
    getAllDateHeure,
    getDateHeure,
    updateDateHeure,
    deleteDateHeure
} = require('../controllers/Date_heureController');

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
    addSerre,
    getAllSerres,
    getSerre,
    updateSerre,
    deleteSerre,
    getSerresByUser
} = require('../controllers/SerreController');

const {
    addPlante,
    getAllPlantes,
    getPlante,
    updatePlante,
    deletePlante
} = require('../controllers/PlanteController');

const {
    addPorte,
    getAllPortes,
    getPorte,
    updatePorte,
    deletePorte
} = require('../controllers/PorteController');

const {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/UserController');

const router = express.Router();

router.post('/dateHeure', addDateHeure);
router.get('/dateHeures', getAllDateHeure);
router.get('/dateHeure/:id', getDateHeure);
router.put('/dateHeure/:id', updateDateHeure);
router.delete('/dateHeure/:id', deleteDateHeure);

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


router.post('/etatSerre', addEtatSerre);
router.get('/etatsSerre', getAllEtatsSerre);
router.get('/etatSerre/:id', getEtatSerre);
router.put('/etatSerre/:id', updateEtatSerre);
router.delete('/etatSerre/:id', deleteEtatSerre);




router.post('/plante', addPlante);
router.get('/plantes', getAllPlantes);
router.get('/plante/:id', getPlante);
router.put('/plante/:id', updatePlante);
router.delete('/plante/:id', deletePlante);

router.post('/porte', addPorte);
router.get('/portes', getAllPortes);
router.get('/porte/:id', getPorte);
router.put('/porte/:id', updatePorte);
router.delete('/porte/:id', deletePorte);

router.post('/serre', addSerre);
router.get('/serres', getAllSerres);
router.get('/serre/:id', getSerre);
router.get('/serres/:user_id', getSerresByUser);
router.put('/serre/:id', updateSerre);
router.delete('/serre/:id', deleteSerre);

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