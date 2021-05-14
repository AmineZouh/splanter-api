class Serre {
    constructor(id, nom, luminosite, temperatureMax, temperatureMin, humiditeMax, humiditeMin, idUser) {
        this.id = id;
        this.idUser = idUser;
        this.nom = nom;
        this.luminosite = luminosite;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.humiditeMax = humiditeMax;
        this.humiditeMin = humiditeMin;
        this.plantes = [];
    }
}

module.exports = Serre;