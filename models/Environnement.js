class Environnement {
    constructor(id, temperatureMax, temperatureMin, humiditeMax, humiditeMin,
        humiditeSolMax, humiditeSolMin) {
        this.id = id;
        this.temperatureMax = temperatureMax;
        this.temperatureMin = temperatureMin;
        this.humiditeMax = humiditeMax;
        this.humiditeMin = humiditeMin;
        this.humiditeSolMax = humiditeSolMax;
        this.humiditeSolMin = humiditeSolMin;
    }
}

module.exports = Environnement;