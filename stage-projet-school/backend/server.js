const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
var config =require('./config')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
mongoose.connect(config.dbUrl)
const connection = mongoose.connection;
connection.on('connected', () => {
  console.log("MongoDB database connection established successfully");
});
connection.on('error', err => {
  console.log("error at MongoDB :"+ err);
});

const filiereRouter = require('./routes/filiere');
const matiereRouter = require('./routes/matiere');
const adminRouter = require('./routes/admin');
const loginadminRouter = require('./routes/loginAdmin');
const etudiantRouter = require('./routes/etudiant');
const enseignantRouter = require('./routes/enseignant');
const loginEnseignantRouter = require('./routes/loginEnseignant');
const loginEtudiantRouter = require('./routes/loginEtudiant');
const activiteRouter = require('./routes/activite');

app.use('/filiere', filiereRouter);
app.use('/matiere', matiereRouter);
app.use('/admin',adminRouter);
app.use('/etudiant',etudiantRouter);
app.use('/enseignant',enseignantRouter);
app.use('/activite',activiteRouter);
app.use('/loginEnseignant',loginEnseignantRouter);
app.use('/loginAdmin',loginadminRouter);
app.use('/loginEtudiant',loginEtudiantRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});