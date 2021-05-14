class EtatPlante {
    constructor(id, temperature, humidite, humiditeSol, date, idPlante) {
        this.id = id;
        this.humiditeSol = humiditeSol;
        this.idPlante = idPlante;
    }
}

module.exports = EtatPlante;