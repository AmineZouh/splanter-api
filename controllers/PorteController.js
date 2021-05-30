'use strict';

const firebase = require('../db');
const Porte = require('../models/Porte');
const firestore = firebase.firestore();


const addPorte = async (req, res, next) => {
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
            const plantes = serreData.data().plantes;
            const portes = serreData.data().portes;
            const porte = new Porte(
                portes.length+1,
                data.isOpen
            );
            portes.push(porte);
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

const getAllPortes = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        const portesArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                doc.data().portes.foreach(porte => {
                    const nPorte = new Porte(
                        porte.id,
                        porte.isOpen
                    );
                    portesArray.push(nPorte);
                })
            });
            res.send(portesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        if(!data.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            const lFPorte =  data.data().portes[id-1];
            if(lFPorte!= null){
                res.send(lFPorte);
            }
            else{
                res.status(404).send('Porte with that id does not existe');
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePorte = async (req, res, next) => {
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
            var portes = serreData.data().portes;
            const nPorte = new Porte(
                id,
                data.isOpen
            );
            portes[id-1] = nPorte;
            const idUser = serreData.data().idUser;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoUrl = serreData.data().photoUrl;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const plantes = serreData.data().plantes
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
        res.send('Porte record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            var portes = serreData.data().portes;
            delete portes[id-1];
            const idUser = serreData.data().idUser;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoUrl = serreData.data().photoUrl;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const plantes = serreData.data().plantes
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
        res.send('Porte record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getSerreByPorte = async (req, res, next) =>{
//     try {
//         const idPorte = req.params.idPorte;
//         const porte = await firestore.collection('portes').doc(idPorte);
//         const data = await porte.get();
//         if (!data.exists) {
//             res.status(404).send('Porte with the given ID not found');
//         } else {
//             const idSerre = data.data().idSerre;
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
    addPorte,
    getAllPortes,
    getPorte,
    updatePorte,
    deletePorte,
    // getSerreByPorte
}