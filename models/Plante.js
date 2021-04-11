class Plante {
    constructor(id, nom, type, humiditeSolMax, humiditeSolMin) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.humiditeSolMax= humiditeSolMax;
        this.humiditeSolMin= humiditeSolMin;
    }
}

module.exports = Plante;