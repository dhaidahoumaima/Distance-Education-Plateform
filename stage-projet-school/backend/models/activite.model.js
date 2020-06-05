const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activiteSchema = new Schema({
    nom_activite: {
        type : String,
        required : true,
        
    },
    fichier : {
        type : String,
  
        
    },
    type_activite : {
        type : String,
        
        
    },
    nom_matiere: {
        type : Schema.Types.ObjectId,
        ref :'matieres'
        
    },
    nom_filiere: {
        type : Schema.Types.ObjectId,
        ref :'filieres'
        
    },
    nom_ens: {
        type : Schema.Types.ObjectId,
        ref :'enseignants'
        
    },
    description : {
        type : String,
        required : true,
        
    },
  
   
},
    {timestamps : true,}

    
);
const activite = mongoose.model('activites',activiteSchema);
module.exports = activite;