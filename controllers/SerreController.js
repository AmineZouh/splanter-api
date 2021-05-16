'use strict';

const firebase = require('../db');
const Serre = require('../models/Serre');
const firestore = firebase.firestore();


const addSerre = async (req, res, next) => {
    try {
        const data = req.body;
        const idUser = data['idUser'];
        const documentRef = firestore.collection("serres").doc();
        const serreId = documentRef.id;
        const serre = {
            id: serreId,
            idUser : data.idUser,
            nom : data.nom,
            luminosite : data.luminosite,
            temperatureMax : data.temperatureMax,
            temperatureMin : data.temperatureMin,
            humiditeMax : data.humiditeMax,
            humiditeMin : data.humiditeMin,
            plantes : data.plantes
        };
        await firestore.collection("serres").doc(serreId).set(JSON.parse(JSON.stringify(serre)));
        const user = await firestore.collection('users').doc(idUser);
        var dataUser = await user.get();
        if (!dataUser.exists) {
            res.status(404).send('user with the given ID not found');
        } else {
            var tabSerre = dataUser.data().serres;
            tabSerre.push(serreId);
            const nuser = {
                id: dataUser.data().id,
                nom: dataUser.data().nom,
                prenom: dataUser.data().prenom,
                email: dataUser.data().email,
                mot_de_passe: dataUser.data().mot_de_passe,
                serres: tabSerre
            }
            await user.update(JSON.parse(JSON.stringify(nuser)));
        }
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
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
                    doc.data().nom,
                    doc.data().luminosite,
                    doc.data().temperatureMax,
                    doc.data().temperatureMin,
                    doc.data().humiditeMax,
                    doc.data().humiditeMin,
                    doc.data().idUser
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
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        console.log(data.data());
        if (!data.exists) {
            res.status(404).send('Serre with the given ID not found');
        }
        else {
            const plantes = data.data().plantes;
            var tab_plantes = new Array(plantes.length);
            var index = 0;
            plantes.forEach(async idPlante => {
                const plante = await firestore.collection('plantes').doc(idPlante);
                const dataPlante = await plante.get();
                tab_plantes[index] = dataPlante.data();
                index ++;
                if(index == plantes.length){
                    res.status(200).send(tab_plantes)
                }
            });
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const getUserBySerre = async (req, res, next) => {
    try{
        const idSerre = req.params.idSerre;
        const serre = await firestore.collection('serres').doc(idSerre);
        const data = await serre.get();
        if(!data.exists){
            res.status(404).send('Serre with that id does not existe');
        }
        else{
            const idUser = data.data().idUser;
            const user = await firestore.collection('users').doc(idUser);
            const dataUser = await user.get();
            if(!dataUser.exists){
                res.status(404).send('User with that id does not existe');
            }
            else{
                res.send(dataUser.data());
            }
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
    getUserBySerre
}