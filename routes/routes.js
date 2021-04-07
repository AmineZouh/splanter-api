const express = require('express');
const {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

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

router.post('/student', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

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