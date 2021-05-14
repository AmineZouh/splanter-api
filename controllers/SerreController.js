'use strict';

const firebase = require('../db');
const Serre = require('../models/Serre');
const firestore = firebase.firestore();


const addSerre = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('serres').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addPlantes = async (req, res, next) => {
    try{
        const plantes = req.body;
        const idSerre = plantes[0].idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        } else {
            plantes.forEach(plante=>{
                data.data().plantes.push(plante);
            })
        }
        await serre.update(data.data());
        res.send('Records added successfuly');
    }
    catch(e){
        res.status(400).send(e.message)
    }

}

const getAllSerres = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        const serresArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                const serre = new Serre(
                    doc.id,
                    doc.data().Nom,
                    doc.data().Luminosite,
                    doc.data().temperatureMax,
                    doc.data().temperatureMin,
                    doc.data().humiditeMax,
                    doc.data().humiditeMin,
                    doc.data().plantes
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
        const serre = await firestore.collection('serres').doc(id);
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
        const serre = await firestore.collection('serres').doc(id);
        await serre.update(data);
        res.send('Serre record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSerre = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('serres').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlantesBySerre = async (req, res, next) => {
    try{
        const idSerre = req.params.id;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        }
        else {
            const plantes = data.data().plantes;
            const tab_plantes = [];
            plantes.forEach(async idPlante => {
                const plante = await firestore.collection('plantes').doc(idPlante);
                const data = plante.get();
                tab_plantes.push(data.data())
            });
            res.send(tab_plantes);
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    addSerre,
    addPlantes,
    getAllSerres,
    getSerre,
    updateSerre,
    deleteSerre,
    getPlantesBySerre
}