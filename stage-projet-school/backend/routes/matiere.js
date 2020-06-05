const router = require('express').Router();
let matiere = require('../models/matiere.model');


router.route('/').get((req, res) => {
    matiere.find().populate("nom_filiere").populate("ens_matiere")
      .then(matieres => res.json(matieres))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/addmatiere').post((req, res) => {
    const  nom_matiere = req.body.nom_matiere;
    const  ens_matiere = req.body.ens_matiere;
    const  heure_matiere = req.body.heure_matiere;
    const  nom_filiere = req.body.nom_filiere;

    const newmatiere = new matiere({    
        nom_matiere,
        ens_matiere,
        heure_matiere,
        nom_filiere,
    
    });
  
    newmatiere.save()
    .then(() => res.json('matiere ajoute !'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    matiere.findById(req.params.id).populate("nom_filiere").populate("ens_matiere")
      .then(matiere => res.json(matiere))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/findByFiliere/:nom_filiere').get((req, res) => {
    matiere.find({nom_filiere:req.params.nom_filiere}).populate("nom_filiere").populate("ens_matiere")
      .then(matiere => res.json(matiere))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/findByEnseignant/:ens_matiere').get((req, res) => {
    matiere.find({ens_matiere:req.params.ens_matiere}).populate("nom_filiere").populate("ens_matiere")
      .then(matiere => res.json(matiere))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    matiere.findByIdAndDelete(req.params.id).populate("nom_filiere").populate("ens_matiere")
      .then(() => res.json('matiere supprime '))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/editmatiere/:id').post((req, res) => {
    matiere.findById(req.params.id).populate("nom_filiere").populate("ens_matiere")
      .then(matiere => {
        matiere.nom_matiere = req.body.nom_matiere;
        matiere.ens_matiere = req.body.ens_matiere;
        matiere.heure_matiere = req.body.heure_matiere;
        matiere.nom_filiere = req.body.nom_filiere;
  
        matiere.save()
          .then(() => res.json('matiere modifie !'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;