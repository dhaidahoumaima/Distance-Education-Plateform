const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filiereSchema = new Schema({
    nom_filiere : {
        type : String,
        required : true,     
    },
    description : {
        type : String,
        required : true,     
    },
 
   
},
    {timestamps : true,}

);
const filiere = mongoose.model('filieres',filiereSchema);
module.exports = filiere;