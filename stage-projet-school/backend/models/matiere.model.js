const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matiereSchema = new Schema({
    nom_matiere : {
        type : String,
        required : true,     
    },
    ens_matiere : {
        type : Schema.Types.ObjectId,
        ref :'enseignants'
        
    },
    heure_matiere : {
        type : String,
        required : true,     
    },
    nom_filiere: {
        type : Schema.Types.ObjectId,
        ref :'filieres'
        
    },
   
   
},
    {timestamps : true,}
    
);
const matiere = mongoose.model('matieres',matiereSchema);
module.exports = matiere;
