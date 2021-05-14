'use strict';

const firebase = require('../db');
const User = require('../models/User');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addSerres = async (req, res, next) => {
    try{
        const serres = req.body;
        const idUser = plantes[0].idSerre;
        const user = await firestore.collection('serres').doc(iduser);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send('user with the given ID not found');
        } else {
            serres.forEach(serre=>{
                data.data().serres.push(serre);
            })
        }
        await user.update(data.data());
        res.send('Records addded successfuly');
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            res.status(404).send('No user record found');
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().nom,
                    doc.data().prenom,
                    doc.data().email,
                    doc.data().mot_de_passe
                );
                usersArray.push(User);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
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
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('user record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSerresByUser = async (req, res, next) => {
    const iduser = req.params.id;
    const user = await firestore.collection('users').doc(idUser);
    const data  = user.get();
    if(!data){
        res.send("User with the given id  does not existe");
    }
    else{
        const serres = data.data().serres;
        const tab_serres = [];
        serres.forEach(async idSerre => {
            const serre = await firestore.collection('serres').doc(idUser);
            const data = serre.get();
            tab_serres.push(data.data());
        });
        res.send(tab_serres);
    }
}

module.exports = {
    addUser,
    addSerres,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getSerresByUser
}