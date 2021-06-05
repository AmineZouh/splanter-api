class EtatSerre {
    constructor(id, humidite, temperature, timestamp, serreID) {
        this.id = id;
        this.humidite = humidite;
        this.temperature = temperature;
        this.timestamp = timestamp;
        this.serreID = serreID;
    }
}

module.exports = EtatSerre;