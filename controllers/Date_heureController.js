'use strict';

const firebase = require('../db');
const Date_heure = require('../models/Date_heure');
const firestore = firebase.firestore();

const hello = async (req, res) => {
    res.send('hello world');
}

const addDateHeure = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('date_heure').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllDateHeure = async (req, res, next) => {
    try {
        const date_heures = await firestore.collection('date_heure');
        const data = await date_heures.get();
        const date_heuresArray = [];
        if (data.empty) {
            res.status(404).send('No date record found');
        } else {
            data.forEach(doc => {
                const dateHeure = new Date_heure(
                    doc.id,
                    doc.data().timestamp,
                    doc.data().etat_plante,
                    doc.data().planteID,
                    doc.data().serreID,
                    doc.data().irrigation
                );
                date_heuresArray.push(dateHeure);
            });
            res.send(date_heuresArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDateHeure = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dateHeure = await firestore.collection('date_heure').doc(id);
        const data = await dateHeure.get();
        if (!data.exists) {
            res.status(404).send('DateHeure with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDateHeure = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const dateHeure = await firestore.collection('date_heure').doc(id);
        await dateHeure.update(data);
        res.send('Date_heure record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDateHeure = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('date_heure').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addDateHeure,
    getAllDateHeure,
    getDateHeure,
    updateDateHeure,
    deleteDateHeure,
    hello
}