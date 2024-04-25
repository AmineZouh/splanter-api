const express = require("express");

const {
  hello,
  addDateHeure,
  getAllDateHeure,
  getDateHeure,
  updateDateHeure,
  deleteDateHeure,
} = require("../controllers/Date_heureController");

const {
  // addIrrigation,
  // getAllIrrigation,
  // getIrrigation,
  // updateIrrigation,
  // deleteIrrigation
} = require("../controllers/IrrigationController");

const {
  // addEtatPlante,
  // getAllEtatPlante,
  // getEtatPlante,
  // updateEtatPlante,
  // deleteEtatPlante
} = require("../controllers/EtatPlanteController");

const {
  addEtatSerre,
  getAllEtatsSerre,
  getEtatSerre,
  updateEtatSerre,
  deleteEtatSerre,
} = require("../controllers/EtatSerreController");

const {
  addSerre,
  getAllSerres,
  getSerre,
  updateSerre,
  deleteSerre,
  getPlantesBySerre,
  getPortesBySerre,
} = require("../controllers/SerreController");

const {
  addPlante,
  getAllPlantes,
  getPlante,
  updatePlante,
  deletePlante,
} = require("../controllers/PlanteController");

const {
  addPorte,
  getAllPortes,
  getPorte,
  updatePorte,
  deletePorte,
} = require("../controllers/PorteController");

const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getSerresByUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/", hello);
router.post("/dateHeure", addDateHeure);
router.get("/dateHeures", getAllDateHeure);
router.get("/dateHeure/:id", getDateHeure);
router.put("/dateHeure/:id", updateDateHeure);
router.delete("/dateHeure/:id", deleteDateHeure);

router.post("/user", addUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:idUser/serres", getSerresByUser); //teste réussi

router.post("/etatSerre", addEtatSerre);
router.get("/etatsSerre", getAllEtatsSerre);
router.get("/etatSerre/:id", getEtatSerre);
router.put("/etatSerre/:id", updateEtatSerre);
router.delete("/etatSerre/:id", deleteEtatSerre);

router.post("/plante/:idSerre", addPlante); //teste réussi
router.get("/plantes", getAllPlantes); //à tester
router.get("/plante/:id/:idSerre", getPlante); //teste réussi
router.put("/plante/:id/:idSerre", updatePlante); //teste réussi
router.delete("/plante/:id/:idSerre", deletePlante); //teste réussi

router.post("/porte/:idSerre", addPorte); //teste réussi
router.get("/portes", getAllPortes); //à tester
router.get("/porte/:id/:idSerre", getPorte); //teste réussi
router.put("/porte/:id/:idSerre", updatePorte); //teste réussi
router.delete("/porte/:id/:idSerre", deletePorte); //teste réussi

router.post("/serre", addSerre);
router.get("/serres", getAllSerres);
router.get("/serre/:id", getSerre);
router.get("/serre/:idSerre/plantes", getPlantesBySerre); //teste réussi
router.get("/serre/:idSerre/portes", getPortesBySerre); //teste réussi
router.put("/serre/:id", updateSerre);
router.delete("/serre/:id", deleteSerre);

// router.post('/irrigation', addIrrigation);
// router.get('/irrigations', getAllIrrigation);
// router.get('/irrigation/:id', getIrrigation);
// router.put('/irrigation/:id', updateIrrigation);
// router.delete('/irrigation/:id', deleteIrrigation);

// router.post('/etatPlante', addEtatPlante);
// router.get('/etatPlantes', getAllEtatPlante);
// router.get('/etatPlante/:id', getEtatPlante);
// router.put('/etatPlante/:id', updateEtatPlante);
// router.delete('/etatPlante/:id', deleteEtatPlante);
//this comment is for comment

module.exports = {
  routes: router,
};
