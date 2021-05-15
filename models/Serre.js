class Serre {
    constructor(id, nom, luminosite, temperatureMax, temperatureMin, humiditeMax, humiditeMin, idUser, plantes) {
        this.id = id;
        this.idUser = idUser;
        this.nom = nom;
        this.luminosite = luminosite;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.humiditeMax = humiditeMax;
        this.humiditeMin = humiditeMin;
        this.plantes = plantes;
    }
}

module.exports = Serre;