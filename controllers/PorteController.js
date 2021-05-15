'use strict';

const firebase = require('../db');
const Porte = require('../models/Porte');
const firestore = firebase.firestore();


const addPorte = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('portes').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllPortes = async (req, res, next) => {
    try {
        const portes = await firestore.collection('portes');
        const data = await portes.get();
        const portesArray = [];
        if (data.empty) {
            res.status(404).send('No porte record found');
        } else {
            data.forEach(doc => {
                const porte = new Porte(
                    doc.id,
                    doc.data().isOpen,
                );
                portesArray.push(porte);
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
        const porte = await firestore.collection('portes').doc(id);
        const data = await porte.get();
        if (!data.exists) {
            res.status(404).send('Porte with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const porte = await firestore.collection('portes').doc(id);
        await porte.update(data);
        res.send('Porte record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('portes').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSerreByPorte = async (req, res, next) =>{
    try {
        const idPorte = req.params.idPorte;
        const porte = await firestore.collection('portes').doc(idPorte);
        const data = await porte.get();
        if (!data.exists) {
            res.status(404).send('Porte with the given ID not found');
        } else {
            const idSerre = data.data().idSerre;
            const serre = await firestore.collection('serres').doc(idSerre);
            const dataSerre = await serre.get();
            if (!dataSerre.exists) {
                res.status(404).send('Serre with the given ID not found');
            } else {
                res.send(dataSerre.data());
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}

module.exports = {
    addPorte,
    getAllPortes,
    getPorte,
    updatePorte,
    deletePorte,
    getSerreByPorte
}