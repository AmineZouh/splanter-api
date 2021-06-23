'use strict';

const firebase = require('../db');
const Plante = require('../models/Plante');
const Serre = require('../models/Serre');
const firestore = firebase.firestore();



const addPlante = async (req, res, next) => {
    try{
        const idSerre = req.params.idSerre;
        const data = req.body;
        const serre = await firestore.collection('serre').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with that id does not existe');
        }
        else{
            const utilisateurID = serreData.data().utilisateurID;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoURL = serreData.data().photoURL;
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
                data.humiditeSolMax,
                data.humiditeSolMin,
                data.description
            );
            console.log(plantes);
            plantes.push(plante);
            const nSerre = {
                utilisateurID,
                description,
                nom,
                photoURL,
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
        const serres = await firestore.collection('serre');
        const data = await serres.get();
        var plantesArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                const plantes = doc.data().plantes;
                plantesArray = plantesArray.concat(plantes);
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
        const serre = await firestore.collection('serre').doc(idSerre);
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
        const serre = await firestore.collection('serre').doc(idSerre);
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
                data.humiditeSolMax,
                data.humiditeSolMin,
                data.description,
                data.photoURL
            );
            plantes[id-1] = nPlante;
            const utilisateurID = serreData.data().utilisateurID;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoURL = serreData.data().photoURL;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const portes = serreData.data().portes
            const nSerre = {
                utilisateurID,
                description,
                nom,
                photoURL,
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
        const serre = await firestore.collection('serre').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with the given id does not existe');
        }
        else{
            var plantes = serreData.data().plantes;
            delete plantes[id-1];
            const utilisateurID = serreData.data().utilisateurID;
            const description = serreData.data().description;
            const nom = serreData.data().nom;
            const photoURL = serreData.data().photoURL;
            const luminosite = serreData.data().luminosite;
            const temperatureMax = serreData.data().temperatureMax;
            const temperatureMin = serreData.data().temperatureMin;
            const humiditeMax = serreData.data().humiditeMax;
            const humiditeMin = serreData.data().humiditeMin;
            const portes = serreData.data().portes
            const nSerre = {
                utilisateurID,
                description,
                nom,
                photoURL,
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



module.exports = {
    addPlante,
    getAllPlantes,
    getPlante,
    updatePlante,
    deletePlante,
}