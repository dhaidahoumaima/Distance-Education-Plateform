const router = require('express').Router();
let filiere = require('../models/filiere.model');


router.route('/').get((req, res) => {
    filiere.find()
      .then(filieres => res.json(filieres))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/addfiliere').post((req, res) => {
    const nom_filiere = req.body.nom_filiere;
    const description = req.body.description;

    const newfiliere = new filiere({
      nom_filiere,
      description,
    });
  
    newfiliere.save()
    .then(() => res.json('filiere ajoute !'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').get((req, res) => {
    filiere.findById(req.params.id)
      .then(filieres => res.json(filieres))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    filiere.findByIdAndDelete(req.params.id)
      .then(() => res.json('filiere supprime '))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/editfiliere/:id').post((req, res) => {
    filiere.findById(req.params.id)
      .then(filiere => {
        filiere.nom_filiere= req.body.nom_filiere;
        filiere.description = req.body.description;
  
        filiere.save()
          .then(() => res.json('filiere modifie !'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
module.exports = router;