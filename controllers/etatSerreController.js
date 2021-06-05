'use strict';

const firebase = require('../db');
const etatSerre = require('../models/EtatSerre');
const firestore = firebase.firestore();


const addEtatSerre = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('etat_serre').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllEtatsSerre = async (req, res, next) => {
    try {
        const etatsSerre = await firestore.collection('etat_serre');
        const data = await etatsSerre.get();
        const etatsSerreArray = [];
        if(data.empty) {
            res.status(404).send('No etatSerre record found');
        }else {
            data.forEach(doc => {
                const etatSerre = new etatSerre(
                    doc.id,
                    doc.data().humidite,
                    doc.data().temperature,
                    doc.data().timestamp,
                    doc.data().serreID
                );
                etatsSerreArray.push(etatSerre);
            });
            res.send(etatsSerreArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEtatSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const etatSerre = await firestore.collection('etat_serre').doc(id);
        const data = await etatSerre.get();
        if(!data.exists) {
            res.status(404).send('EtatSerre with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEtatSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const etatSerre =  await firestore.collection('etat_serre').doc(id);
        await etatSerre.update(data);
        res.send('EtaSerre record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEtatSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('etat_serre').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEtatSerre,
    getAllEtatsSerre,
    getEtatSerre,
    updateEtatSerre,
    deleteEtatSerre
}