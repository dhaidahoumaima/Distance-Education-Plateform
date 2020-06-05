const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enseignantSchema = new Schema({
    code_ens : {
        type : String,
        required : true,
        unique : true,
    },
    cin : {
        type : String,
        required : true,   
    },
    nom : {
        type : String,
        required : true,  
    },
    prenom : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    sexe : {
        type : String,
        required : true,  
    },
    date_naissance : {
        type : Date,
        required : true,
    },
    telephone : {
        type : String,
        required : true,
    },
 
},
    {timestamps : true,}
);
const enseignant = mongoose.model('enseignants',enseignantSchema);
module.exports = enseignant;