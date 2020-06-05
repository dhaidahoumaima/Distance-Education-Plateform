const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    code_admin : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
},
    {timestamps : true,}
);
const Admin = mongoose.model('admins',adminSchema);
module.exports = Admin;