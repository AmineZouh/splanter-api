class Plante {

    constructor(id, nom, type, humiditeSolMax, humiditeSolMin, description, photoURL) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.description = description;
        this.humiditeSolMax= humiditeSolMax;
        this.humiditeSolMin= humiditeSolMin;
        this.photoURL= photoURL;
    }
}

module.exports = Plante;