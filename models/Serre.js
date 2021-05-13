class Serre {
    constructor(id, nom, luminosite, temperatureMax, temperatureMin, humiditeMax, humiditeMin, user_id) {
        this.id = id;
        this.nom = nom;
        this.luminosite = luminosite;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.humiditeMax = humiditeMax;
        this.humiditeMin = humiditeMin;
        this.user_id = user_id;
    }
}

module.exports = Serre;