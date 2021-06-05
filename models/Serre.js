class Serre {
    constructor(id, nom, luminosite, temperatureMax, temperatureMin, humiditeMax, humiditeMin, utilisateurID, plantes, portes, description, photoURL) {
        this.id = id;
        this.utilisateurID = utilisateurID;
        this.description = description;
        this.nom = nom;
        this.photoURL = photoURL;
        this.luminosite = luminosite;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.humiditeMax = humiditeMax;
        this.humiditeMin = humiditeMin;
        this.plantes = plantes;
        this.portes = portes;
    }
}

module.exports = Serre;