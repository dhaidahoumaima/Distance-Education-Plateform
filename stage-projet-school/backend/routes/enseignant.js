const router = require('express').Router();
let enseignant = require('../models/enseignant.model');

router.route('/').get((req, res) => {
  enseignant.find()
      .then(enseignants => res.json(enseignants))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/addenseignant').post((req, res) => {
    const code_ens = req.body.code_ens;
    const cin  = req.body.cin;
    const nom = req.body.nom;
    const prenom  = req.body.prenom;
    const  email   = req.body.email;
    const  sexe = req.body.sexe;
    const date_naissance = Date.parse(req.body.date_naissance);
    const  telephone   = req.body.telephone;
    const newenseignant = new enseignant({
      code_ens,
      cin,
      nom,
      prenom,
      email,
      sexe,
      date_naissance,
      telephone,
    });
  
    newenseignant.save()
    .then(() => res.json('enseignant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    enseignant.findById(req.params.id)
      .then(enseignants => res.json(enseignants))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    enseignant.findByIdAndDelete(req.params.id)
      .then(() => res.json('enseignant deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/editenseignant/:id').post((req, res) => {
    enseignant.findById(req.params.id)
      .then(enseignant => {
        enseignant.code_ens = req.body.code_ens;
        enseignant.cin = req.body.cin;
        enseignant.nom = req.body.nom;
        enseignant.prenom = req.body.prenom;
        enseignant.email = req.body.email;
        enseignant.sexe = req.body.sexe;
        enseignant.date_naissance = Date.parse(req.body.date_naissance);
        enseignant.telephone = req.body.telephone;
        
        enseignant.save()
          .then(() => res.json('enseignant updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/editenseignantbyenseignant/:id').post((req, res) => {
    enseignant.findById(req.params.id)
      .then(enseignant => {
        enseignant.email = req.body.email;
        enseignant.telephone = req.body.telephone;
        
        enseignant.save()
          .then(() => res.json('enseignant updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;