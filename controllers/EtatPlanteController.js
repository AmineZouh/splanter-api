'use strict';

const firebase = require('../db');
const EtatPlante = require('../models/EtatPlante');
const firestore = firebase.firestore();


const addEtatPlante = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('etatPlantes').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllEtatPlante = async (req, res, next) => {
    try {
        const etatPlantes = await firestore.collection('etatPlantes');
        const data = await etatPlantes.get();
        const etatPlantesArray = [];
        if (data.empty) {
            res.status(404).send('No etatPlante record found');
        } else {
            data.forEach(doc => {
                const etatPlante = new EtatPlante(
                    doc.id,
                    doc.data().temperature,
                    doc.data().humidite,
                    doc.data().humiditeSol,
                    doc.data().date,
                );
                etatPlantesArray.push(etatPlante);
            });
            res.send(etatPlantesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEtatPlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const etatPlante = await firestore.collection('etatPlantes').doc(id);
        const data = await etatPlante.get();
        if (!data.exists) {
            res.status(404).send('EtatPlante with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEtatPlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const etatPlante = await firestore.collection('etatPlantes').doc(id);
        await etatPlante.update(data);
        res.send('EtatPlante record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEtatPlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('etatPlantes').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEtatPlante,
    getAllEtatPlante,
    getEtatPlante,
    updateEtatPlante,
    deleteEtatPlante
}