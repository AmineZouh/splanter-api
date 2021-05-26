'use strict';

const firebase = require('../db');
const Plante = require('../models/Plante');
const firestore = firebase.firestore();


// const addPlante = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const idSerre = data['idSerre'];
//         const documentRef = firestore.collection("plantes").doc();
//         const planteId = documentRef.id;
//         const plante = {
//             id: planteId,
//             nom : data.nom,
//             type : data.type,
//             humiditeSolMax : data.humiditeSolMax,
//             humiditeSolMin : data.humiditeSolMin,
//             idSerre : data.idSerre
//         };
//         await firestore.collection("plantes").doc(planteId).set(JSON.parse(JSON.stringify(plante)));
//         const serre = await firestore.collection('serres').doc(idSerre);
//         var dataSerre = await serre.get();
//         if (!dataSerre.exists) {
//             res.status(404).send('Serre with the given ID not found');
//         } else {
//             var tabPlantes = dataSerre.data().plantes;
//             tabPlantes.push(planteId);
//             const nserre = {
//                 id: dataSerre.data().id,
//                 nom: dataSerre.data().nom,
//                 luminosite: dataSerre.data().luminosite,
//                 temperatureMax: dataSerre.data().temperatureMax,
//                 temperatureMin: dataSerre.data().temperatureMin,
//                 humiditeMax: dataSerre.data().humiditeMax,
//                 humiditeMin: dataSerre.data().humiditeMin,
//                 plantes: tabPlantes
//             }
//             await serre.update(JSON.parse(JSON.stringify(nserre)));
//         }
//         res.send('Record saved successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }
const addPlante = async (req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('plantes').doc().set(data);
        res.send('recors saved successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }

}

const getAllPlantes = async (req, res, next) => {
    try {
        const plantes = await firestore.collection('plantes');
        const data = await plantes.get();
        const plantesArray = [];
        if (data.empty) {
            res.status(404).send('No plante record found');
        } else {
            data.forEach(doc => {
                const plante = new Plante(
                    doc.id,
                    doc.data().nom,
                    doc.data().type,
                    doc.data().description,
                    doc.data().humiditeSolMax,
                    doc.data().humiditeSolMin,
                );
                plantesArray.push(plante);
            });
            res.send(plantesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const plante = await firestore.collection('plantes').doc(id);
        const data = await plante.get();
        if (!data.exists) {
            res.status(404).send('Plante with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const plante = await firestore.collection('plantes').doc(id);
        await plante.update(data);
        res.send('Plante record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('plantes').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getSerreByPlante = async (req, res, next) =>{
//     try {
//         const idPlante = req.params.idPlante;
//         const plante = await firestore.collection('plantes').doc(idPlante);
//         const data = await plante.get();
//         if (!data.exists) {
//             res.status(404).send('Plante with the given ID not found');
//         } else {
//             const idSerre = data.data()['idSerre'];
//             const serre = await firestore.collection('serres').doc(idSerre);
//             const dataSerre = await serre.get();
//             if (!dataSerre.exists) {
//                 res.status(404).send('Serre with the given ID not found');
//             } else {
//                 res.send(dataSerre.data());
//             }
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    addPlante,
    getAllPlantes,
    getPlante,
    updatePlante,
    deletePlante,
    getSerreByPlante
}