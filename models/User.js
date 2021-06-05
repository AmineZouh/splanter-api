class User {
    constructor(utilisateurID, nom, prenom, email, photoURL) {
        this.utilisateurID = utilisateurID;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.photoURL = photoURL;
    }
}

module.exports = User;