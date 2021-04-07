'use strict';

const firebase = require('../db');
const Student = require('../models/Environnement');
const firestore = firebase.firestore();


const addEnvironnement = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('environnements').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllEnvironnements = async (req, res, next) => {
    try {
        const environnements = await firestore.collection('environnements');
        const data = await environnements.get();
        const environnementsArray = [];
        if (data.empty) {
            res.status(404).send('No environnement record found');
        } else {
            data.forEach(doc => {
                const environnement = new Environnement(
                    doc.id,
                    doc.data().temperatureMax,
                    doc.data().temperatureMin,
                    doc.data().humiditeMax,
                    doc.data().humiditeMin,
                    doc.data().humiditeSolMax,
                    doc.data().humiditeSolMin
                );
                environnementsArray.push(environnement);
            });
            res.send(environnementsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEnvironnement = async (req, res, next) => {
    try {
        const id = req.params.id;
        const environnement = await firestore.collection('environnements').doc(id);
        const data = await environnement.get();
        if (!data.exists) {
            res.status(404).send('Environnement with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEnvironnement = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const environnement = await firestore.collection('environnements').doc(id);
        await environnement.update(data);
        res.send('Environnement record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEnvironnement = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('environnements').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEnvironnement,
    getAllEnvironnements,
    getEnvironnement,
    updateEnvironnement,
    deleteEnvironnement
}