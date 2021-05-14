class EtatSerre {
    constructor(id, humidite, temperature, date, idSerre) {
        this.id = id;
        this.humidite = humidite;
        this.temperature = temperature;
        this.date = date;
        this.idSerre = idSerre;
    }
}

module.exports = EtatSerre;