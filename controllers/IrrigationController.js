'use strict';

const firebase = require('../db');
const Irrigation = require('../models/Irrigation');
const firestore = firebase.firestore();



// const addIrrigation = async (req, res, next) => {
//     try{
//         const data = req.body;
//         await firestore.collection('irrigations').doc().set(data);
//         res.send('record saved succefully');
//     }
//     catch(error){
//         res.status(400).send(error.message);
//     }
// }

// const getAllIrrigation = async (req, res, next) => {
//     try {
//         const irrigations = await firestore.collection('irrigations');
//         const data = await irrigations.get();
//         const irrigationsArray = [];
//         if (data.empty) {
//             res.status(404).send('No irrigation record found');
//         } else {
//             data.forEach(doc => {
//                 const irrigation = new Irrigation(
//                     doc.id,
//                     doc.data().duree
//                 );
//                 irrigationsArray.push(irrigation);
//             });
//             res.send(irrigationsArray);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getIrrigation = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const irrigation = await firestore.collection('irrigations').doc(id);
//         const data = await irrigation.get();
//         if (!data.exists) {
//             res.status(404).send('Irrigation with the given ID not found');
//         } else {
//             res.send(data.data());
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateIrrigation = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         const irrigation = await firestore.collection('irrigations').doc(id);
//         await irrigation.update(data);
//         res.send('Irrigation record updated successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteIrrigation = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await firestore.collection('irrigations').doc(id).delete();
//         res.send('Record deleted successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    // addIrrigation,
    // getAllIrrigation,
    // getIrrigation,
    // updateIrrigation,
    // deleteIrrigation
}