const express = require('express');
const {addEtatSerre, 
       getAllEtatsSerre, 
       getEtatSerre,
       updateEtatSerre,
       deleteEtatSerre
      } = require('../controllers/etatSerreController');

const router = express.Router();

router.post('/etatSerre', addEtatSerre);
router.get('/etatsSerre', getAllEtatsSerre);
router.get('/etatSerre/:id', getEtatSerre);
router.put('/etatSerre-update/:id', updateEtatSerre);
router.delete('/etatSerre-delete/:id', deleteEtatSerre);


module.exports = {
    routes: router
}