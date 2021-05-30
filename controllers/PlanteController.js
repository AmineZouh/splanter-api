'use strict';

const firebase = require('../db');
const Plante = require('../models/Plante');
const Serre = require('../models/Serre');
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
        const idSerre = req.params.idSerre;
        const data = req.body;
        const serre = await firestore.collection('serres').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with that id does not existe');
        }
        else{
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoUrl = serreData.data().photoUrl;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            var plantes = serreData.data().plantes;
            const portes = serreData.data().portes;
            const plante = new Plante(
                plantes.length+1,
                data.nom,
                data.type,
                data.description,
                data.humiditeSolMax,
                data.humiditeSolMin
            );
            plantes.push(plante);
            const nSerre = {
                description,
                nom,
                photoUrl,
                luminosite,
                temperatureMax,
                temperatureMin,
                humiditeMax,
                humiditeMin,
                plantes,
                portes
            }
            await serre.update(JSON.parse(JSON.stringify(nSerre)));
            res.send('recors saved successfuly');
        }
        
    }
    catch(error){
        res.status(400).send(error.message);
    }

}

const getAllPlantes = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        const plantesArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                doc.data().plantes.foreach(plante => {
                    const nPlante = new Plante(
                        plante.id,
                        plante.nom,
                        plante.type,
                        plante.description,
                        plante.humiditeSolMax,
                        plante.humiditeSolMin,
                    );
                    plantesArray.push(nPlante);
                })
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
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        if(!data.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            const lFPlante =  data.data().plantes[id-1];
            if(lFPlante!= null){
                res.send(lFPlante);
            }
            else{
                res.status(404).send('Plante with that id does not existe');
            }
        }
    } catch (error) {
        if(error != breakException)
        res.status(400).send(error.message);
    }
}

const updatePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idSerre = req.params.idSerre;
        const data = req.body;
        const serre = await firestore.collection('serres').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            var plantes = serreData.data().plantes;
            const nPlante = new Plante(
                id,
                data.nom,
                data.type,
                data.description,
                data.humiditeSolMax,
                data.humiditeSolMin
            );
            plantes[id-1] = nPlante;
            const idUser = serreData.data().idUser;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoUrl = serreData.data().photoUrl;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const portes = serreData.data().portes
            const nSerre = {
                idUser,
                description,
                nom,
                photoUrl,
                luminosite,
                temperatureMax,
                temperatureMin,
                humiditeMax,
                humiditeMin,
                plantes,
                portes
            };
            await serre.update(JSON.parse(JSON.stringify(nSerre)));
        }
        res.send('Plante record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            var plantes = serreData.data().plantes;
            delete plantes[id-1];
            const idUser = serreData.data().idUser;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoUrl = serreData.data().photoUrl;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const portes = serreData.data().portes
            const nSerre = {
                idUser,
                description,
                nom,
                photoUrl,
                luminosite,
                temperatureMax,
                temperatureMin,
                humiditeMax,
                humiditeMin,
                plantes,
                portes
            };
            await serre.update(JSON.parse(JSON.stringify(nSerre)));
        }
        res.send('Plante record deleted successfuly');
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
    // getSerreByPlante
}