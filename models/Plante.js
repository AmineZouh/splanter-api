class Plante {

    constructor(id, nom, type, humiditeSolMax, humiditeSolMin, idSerre) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.humiditeSolMax= humiditeSolMax;
        this.humiditeSolMin= humiditeSolMin;
        this.idSerre = idSerre;
    }
}

module.exports = Plante;