'use strict';

const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('utilisateur').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getAllUsers = async (req, res, next) => {
    try {
        const utilisateur = await firestore.collection('utilisateur');
        const data = await utilisateur.get();
        const utilisateurArray = [];
        if (data.empty) {
            res.status(404).send('No user record found');
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.utilisateurID,
                    doc.data().nom,
                    doc.data().prenom,
                    doc.data().email,
                    doc.data().photoURL
                );
                utilisateurArray.push(user);
            });
            console.log(utilisateurArray);
            res.send(utilisateurArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('utilisateur').doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send('user with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('utilisateur').doc(id);
        await user.update(data);
        res.send('user record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('utilisateur').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getSerresByUser = async (req, res, next) => {
    try{
        const idUser = req.params.idUser;
        const serresRef = await firestore.collection('serre');
        const querySerres = await serresRef.where('utilisateurID', '==', idUser).get();
        if(querySerres.empty){
            res.status(404).send('That user does not have any serre');
        }
        var serres = [];
        querySerres.forEach(serreDoc =>{
            const serreId = serreDoc.id;
            const serreIdUser = serreDoc.data().utilisateurID;
            const serreNom = serreDoc.data().nom;
            const serreLuminosite = serreDoc.data().luminosite;
            const serreTemperatureMax = serreDoc.data().TemperatureMax;
            const serreTemperatureMin = serreDoc.data().Temperaturemin;
            const serreHumiditeMax = serreDoc.data().HumiditeMax;
            const serreHumiditeMin = serreDoc.data().HumiditeMin;
            const serrePlantes = serreDoc.data().plantes;
            const serrePortes = serreDoc.data().portes;
            const serreDescription = serreDoc.data().description;
            const serrePhotoUrl = serreDoc.data().photoURL;
            const serre = {
                serreId,
                serreIdUser,
                serreNom,
                serreLuminosite,
                serreTemperatureMax,
                serreTemperatureMin,
                serreHumiditeMax,
                serreHumiditeMin,
                serrePlantes,
                serrePortes,
                serreDescription,
                serrePhotoUrl
            }
            serres.push(serre);
        })
        res.send(serres);
    }
    catch(error){
        res.status(400).send(error.message);
    }
    
}



module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getSerresByUser
}