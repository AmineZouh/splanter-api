'use strict';

const firebase = require('../db');
const Porte = require('../models/Porte');
const firestore = firebase.firestore();


const addPorte = async (req, res, next) => {
    try{
        const idSerre = req.params.idSerre;
        const data = req.body;
        const serre = await firestore.collection('serres').doc(idSerre);
        const serreData = await serre.get();
        if(!serreData.exists){
            res.status(404).send('Serre with that id does not existe');
        }
        else{
            const serreId = serreData.id;
            const serreDescription = serreData.data().description;
            const serreNom = serreData.data().nom;
            const serrePhotoUrl = serreData.data().photoUrl;
            const serreLuminosite = serreData.data().luminosite;
            const serreTemperatureMax = serreData.data().temperatureMax;
            const serreTemperatureMin = serreData.data().temperatureMin;
            const serreHumiditeMax = serreData.data().humiditeMax;
            const serreHumiditeMin = serreData.data().humiditeMin;
            const plantes = serreData.data().plantes;
            const portes = serreData.data().portes;
            const porte = new Porte(
                portes.length,
                data.isOepn
            )
            portes.push(porte);
            const nSerre = {
                serreId,
                serreDescription,
                serreNom,
                serrePhotoUrl,
                serreLuminosite,
                serreTemperatureMax,
                serreTemperatureMin,
                serreHumiditeMax,
                serreHumiditeMin,
                plantes,
                portes
            }
        }
        await serre.update(JSON.parse(JSON.stringify(nSerre)));
        res.send('recors saved successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }

}

const getAllPortes = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        const portesArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                doc.data().portes.foreach(porte => {
                    const nPorte = new Porte(
                        porte.id,
                        porte.isOpen
                    );
                    portesArray.push(nPorte);
                })
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
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        if(data.empty){
            res.status(404).send('No serre found');
        }
        else{
            const lFPorte = null;
            data.forEach(serre =>{
                portes = serre.data().portes;
                portes.forEach(porte =>{
                    if(porte.id === id){
                        lFPorte = porte
                        break;
                    }
                })
            })
            if(lFPorte!= null){
                res.send(lFPlante);
            }
            else{
                res.status(404).send('Porte with that id does not existe');
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const serres = await firestore.collection('serres');
        const serreData = await serres.get();
        if(data.empty){
            res.status(404).send('no serre found');
        }
        else{
            const lFPorte = null;
            const lFSerre = null;
            const lFPorteIndex = null;
            data.data().forEach(serre =>{
                const index = 0;
                serre.portes.forEach(porte =>{
                    if(porte.id === id){
                        lFSerre = serre;
                        lFPorte = porte;
                        break;
                    }
                    index +=1;
                })
                if(index != serre.portes.length ){
                    lFPorteIndex = index;
                    break;
                }
            })
            if(lFPorteIndex != null){
                var serrePortes = lFSerre.portes;
                delete serrePortes[lFPorteIndex];
                const nPorte = new Porte(
                    lFPlante.id,
                    data.isOepn
                )
                serrePortes.push(nPorte);
                const nSerre = new Serre(
                    lFSerre.nom,
                    lFSerre.luminosite,
                    lFSerre.temperatureMax,
                    lFSerre.temperatureMin,
                    lFSerre.humiditeMax,
                    lFSerre.humiditeMin,
                    lFSerre.idUser,
                    lFSerre.plantes,
                    serrePortes,
                    lFSerre.description,
                    lFSerre.photoUrl
                );
                await lFSerre.update(nSerre);
            }
        }
        res.send('Porte record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePorte = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const serres = await firestore.collection('serres');
        const serreData = await serres.get();
        if(data.empty){
            res.status(404).send('no serre found');
        }
        else{
            const lFPorte = null;
            const lFSerre = null;
            const lFPorteIndex = null;
            data.data().forEach(serre =>{
                const index = 0;
                serre.portes.forEach(porte =>{
                    if(porte.id === id){
                        lFSerre = serre;
                        lFPorte = porte;
                        break;
                    }
                    index +=1;
                })
                if(index != serre.portes.length ){
                    lFPorteIndex = index;
                    break;
                }
            })
            if(lFPorteIndex != null){
                var serrePortes = lFSerre.portes;
                delete serrePortes[lFPorteIndex];
                const nSerre = new Serre(
                    lFSerre.nom,
                    lFSerre.luminosite,
                    lFSerre.temperatureMax,
                    lFSerre.temperatureMin,
                    lFSerre.humiditeMax,
                    lFSerre.humiditeMin,
                    lFSerre.idUser,
                    lFSerre.plantes,
                    serrePortes,
                    lFSerre.description,
                    lFSerre.photoUrl
                );
                await lFSerre.update(nSerre);
            }
        }
        res.send('Porte record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getSerreByPorte = async (req, res, next) =>{
//     try {
//         const idPorte = req.params.idPorte;
//         const porte = await firestore.collection('portes').doc(idPorte);
//         const data = await porte.get();
//         if (!data.exists) {
//             res.status(404).send('Porte with the given ID not found');
//         } else {
//             const idSerre = data.data().idSerre;
//             const serre = await firestore.collection('serres').doc(idSerre);
//             const dataSerre = await serre.get();
//             if (!dataSerre.exists) {
//                 res.status(404).send('Serre with the given ID not found');
//             } else {
//                 res.send(dataSerre.data());
//             }
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }

// }

module.exports = {
    addPorte,
    getAllPortes,
    getPorte,
    updatePorte,
    deletePorte,
    getSerreByPorte
}