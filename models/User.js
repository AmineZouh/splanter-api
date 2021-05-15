class User {
    constructor(id, nom, prenom, email, mot_de_passe, serres) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mot_de_passe = mot_de_passe;
        this.serres = serres;
    }
}

module.exports = User;