class Date_heure{
    constructor(id, timestamp, serreID, planteID, irrigation, etat_plante){
        this.id= id;
        this.timestamp= timestamp;
        this.etat_plante = etat_plante;
        this.planteID = planteID;
        this.serreID = serreID;
        this.irrigation = irrigation;
    }
}

module.exports =  Date_heure;