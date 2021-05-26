class Plante {

    constructor(id, nom, type, humiditeSolMax, humiditeSolMin, description) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.description = description;
        this.humiditeSolMax= humiditeSolMax;
        this.humiditeSolMin= humiditeSolMin;
    }
}

module.exports = Plante;