const router = require('express').Router();
let etudiant = require('../models/etudiant.model');


router.route('/').get((req, res) => {
  etudiant.find().populate("nom_filiere")
      .then(etudiants => res.json(etudiants))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  
  router.route('/addetudiant').post((req, res) => {
    const cne = req.body.cne;
    const cin = req.body.cin;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const  email = req.body.email;
    const  sexe = req.body.sexe;
    const date_naissance = Date.parse(req.body.date_naissance);
    const  telephone = req.body.telephone;
    const  nom_filiere = req.body.nom_filiere;
  
    const newetudiant = new etudiant({
      cne,
      cin,
        nom,
        prenom,
        email,
        sexe,
        date_naissance,
        telephone,
        nom_filiere,
    
    });
  
    newetudiant.save()
    .then(() => res.json('etudiant ajoute !'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    etudiant.findById(req.params.id).populate("nom_filiere")
      .then(etudiants => res.json(etudiants))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    etudiant.findByIdAndDelete(req.params.id).populate("nom_filiere")
      .then(() => res.json('etudiant supprime.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/editetudiant/:id').post((req, res) => {
    etudiant.findById(req.params.id).populate("nom_filiere")
      .then(etudiant => {
        etudiant.cne = req.body.cne;
        etudiant.cin = req.body.cin;
        etudiant.nom = req.body.nom;
        etudiant.prenom = req.body.prenom;
        etudiant.email = req.body.email;
        etudiant.sexe = req.body.sexe;
        etudiant.date_naissance = Date.parse(req.body.date_naissance);
        etudiant.telephone = req.body.telephone;
        etudiant.nom_filiere = req.body.nom_filiere;
        etudiant.save()
          .then(() => res.json('Etudiant modifie !'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //editer le profil par etudiant
  router.route('/editetudiantByEtudiant/:id').post((req, res) => {
    etudiant.findById(req.params.id).populate("nom_filiere")
      .then(etudiant => {
        etudiant.email = req.body.email;
        etudiant.telephone = req.body.telephone;
        etudiant.save()
          .then(() => res.json('Etudiant modifie !'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;