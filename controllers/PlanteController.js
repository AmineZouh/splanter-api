'use strict';

const firebase = require('../db');
const Plante = require('../models/Plante');
const Serre = require('../models/Serre');
const firestore = firebase.firestore();


// const addPlante = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const idSerre = data['idSerre'];
//         const documentRef = firestore.collection("plantes").doc();
//         const planteId = documentRef.id;
//         const plante = {
//             id: planteId,
//             nom : data.nom,
//             type : data.type,
//             humiditeSolMax : data.humiditeSolMax,
//             humiditeSolMin : data.humiditeSolMin,
//             idSerre : data.idSerre
//         };
//         await firestore.collection("plantes").doc(planteId).set(JSON.parse(JSON.stringify(plante)));
//         const serre = await firestore.collection('serres').doc(idSerre);
//         var dataSerre = await serre.get();
//         if (!dataSerre.exists) {
//             res.status(404).send('Serre with the given ID not found');
//         } else {
//             var tabPlantes = dataSerre.data().plantes;
//             tabPlantes.push(planteId);
//             const nserre = {
//                 id: dataSerre.data().id,
//                 nom: dataSerre.data().nom,
//                 luminosite: dataSerre.data().luminosite,
//                 temperatureMax: dataSerre.data().temperatureMax,
//                 temperatureMin: dataSerre.data().temperatureMin,
//                 humiditeMax: dataSerre.data().humiditeMax,
//                 humiditeMin: dataSerre.data().humiditeMin,
//                 plantes: tabPlantes
//             }
//             await serre.update(JSON.parse(JSON.stringify(nserre)));
//         }
//         res.send('Record saved successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }
const addPlante = async (req, res, next) => {
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
            const plante = new Plante(
                plantes.lenght+1,
                data.nom,
                data.type,
                data.humiditeSolMax,
                data.humiditeSolMin,
                data.description
            )
            plantes.push(plante);
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

const getAllPlantes = async (req, res, next) => {
    try {
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        const plantesArray = [];
        if (data.empty) {
            res.status(404).send('No serre record found');
        } else {
            data.forEach(doc => {
                doc.data().plantes.foreach(plante => {
                    const nPlante = new Plante(
                        plante.id,
                        plante.nom,
                        plante.type,
                        plante.description,
                        plante.humiditeSolMax,
                        plante.humiditeSolMin,
                    );
                    plantesArray.push(nPlante);
                })
            });
            res.send(plantesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const serres = await firestore.collection('serres');
        const data = await serres.get();
        if(data.empty){
            res.status(404).send('No serre found');
        }
        else{
            const lFPlante = null;
            data.forEach(serre =>{
                plantes = serre.data().plantes;
                plantes.forEach(plante =>{
                    if(plante.id === id){
                        lFPlante = plante
                        break;
                    }
                })
            })
            if(lFPlante!= null){
                res.send(lFPlante);
            }
            else{
                res.status(404).send('Plante with that id does not existe');
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const serres = await firestore.collection('serres');
        const serreData = await serres.get();
        if(data.empty){
            res.status(404).send('no serre found');
        }
        else{
            const lFPlante = null;
            const lFSerre = null;
            const lFPlanteIndex = null;
            data.data().forEach(serre =>{
                const index = 0;
                serre.plantes.forEach(plante =>{
                    if(plante.id === id){
                        lFSerre = serre;
                        lFPlante = plante;
                        break;
                    }
                    index +=1;
                })
                if(index != serre.plantes.length ){
                    lFPlanteIndex = index;
                    break;
                }
            })
            if(lFPlanteIndex != null){
                var serrePlantes = lFSerre.plantes;
                delete serrePlantes[lFPlanteIndex];
                const nPlante = new Plante(
                    lFPlante.id,
                    data.nom,
                    data.type,
                    data.description,
                    data.humiditeSolMax,
                    data.humiditeSolMin
                )
                serrePlantes.push(nPlante);
                const nSerre = new Serre(
                    lFSerre.nom,
                    lFSerre.luminosite,
                    lFSerre.temperatureMax,
                    lFSerre.temperatureMin,
                    lFSerre.humiditeMax,
                    lFSerre.humiditeMin,
                    lFSerre.idUser,
                    serrePlantes,
                    lFSerre.portes,
                    lFSerre.description,
                    lFSerre.photoUrl
                );
                await lFSerre.update(nSerre);
            }
        }
        res.send('Plante record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePlante = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const serres = await firestore.collection('serres');
        const serreData = await serres.get();
        if(data.empty){
            res.status(404).send('no serre found');
        }
        else{
            const lFPlante = null;
            const lFSerre = null;
            const lFPlanteIndex = null;
            data.data().forEach(serre =>{
                const index = 0;
                serre.plantes.forEach(plante =>{
                    if(plante.id === id){
                        lFSerre = serre;
                        lFPlante = plante;
                        break;
                    }
                    index +=1;
                })
                if(index != serre.plantes.length ){
                    lFPlanteIndex = index;
                    break;
                }
            })
            if(lFPlanteIndex != null){
                var serrePlantes = lFSerre.plantes;
                delete serrePlantes[lFPlanteIndex];
                const nSerre = new Serre(
                    lFSerre.nom,
                    lFSerre.luminosite,
                    lFSerre.temperatureMax,
                    lFSerre.temperatureMin,
                    lFSerre.humiditeMax,
                    lFSerre.humiditeMin,
                    lFSerre.idUser,
                    serrePlantes,
                    lFSerre.portes,
                    lFSerre.description,
                    lFSerre.photoUrl
                );
                await lFSerre.update(nSerre);
            }
        }
        res.send('Plante record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getSerreByPlante = async (req, res, next) =>{
//     try {
//         const idPlante = req.params.idPlante;
//         const plante = await firestore.collection('plantes').doc(idPlante);
//         const data = await plante.get();
//         if (!data.exists) {
//             res.status(404).send('Plante with the given ID not found');
//         } else {
//             const idSerre = data.data()['idSerre'];
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
    addPlante,
    getAllPlantes,
    getPlante,
    updatePlante,
    deletePlante,
    // getSerreByPlante
}