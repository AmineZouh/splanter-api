class EtatPlante {
    constructor(id, temperature, humidite, humiditeSol, date) {
        this.id = id;
        this.temperature = temperature;
        this.humidite = humidite;
        this.humiditeSol = humiditeSol;
        this.date = date;
    }
}

module.exports = EtatPlante;