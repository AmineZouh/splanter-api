'use strict';

const firebase = require('../db');
const Serre = require('../models/Serre');
const firestore = firebase.firestore();


const addSerre = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection("serre").doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getAllSerres = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serre');
        const data = await serres.get();
        const serresArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                const serre = new Serre(
                    doc.id,
                    doc.data().utilisateurID,
                    doc.data().nom,
                    doc.data().luminosite,
                    doc.data().temperatureMax,
                    doc.data().temperatureMin,
                    doc.data().humiditeMax,
                    doc.data().humiditeMin,
                    doc.data().plantes,
                    doc.data().portes,
                    doc.data().description,
                    doc.data().photoURL
                );
                serresArray.push(serre);
            });
            res.send(serresArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const serre = await firestore.collection('serre').doc(id);
        const data = await serre.get();
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const serre = await firestore.collection('serre').doc(id);
        await serre.update(data);
        res.send('Serre record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('serre').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlantesBySerre = async (req, res, next) => {
    try{
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serre').doc(idSerre);
        const data = await serre.get();
        console.log(data.data());
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        }
        else {
            const plantes = data.data().plantes;
            res.status(200).send(plantes)
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const getPortesBySerre = async (req, res, next) => {
    try{
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serre').doc(idSerre);
        const data = await serre.get();
        console.log(data.data());
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        }
        else {
            const portes = data.data().portes;
            res.status(200).send(portes)
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
}


module.exports = {
    addSerre,
    getAllSerres,
    getSerre,
    updateSerre,
    deleteSerre,
    getPlantesBySerre,
    getPortesBySerre,
}