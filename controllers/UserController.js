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
                    doc.data().mot_de_passe,
                    doc.data().serres
                );
                usersArray.push(user);
            });
            console.log(usersArray);
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
    const idUser = req.params.idUser;
    const user = await firestore.collection('users').doc(idUser);
    const data  = await user.get();
    if(!data.exists){
        res.send("User with the given id  does not existe");
    }
    else{
        const serres = data.data()['serres'];
        var tab_serres = new Array(serres.length);
        var index = 0;
        serres.forEach(async idSerre => {
            const serre = await firestore.collection('serres').doc(idSerre);
            const dataSerre = await serre.get();
            tab_serres[index] = dataSerre.data();
            index ++;
            if(index == serres.length){
                res.status(200).send(tab_serres);
            }
        });
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