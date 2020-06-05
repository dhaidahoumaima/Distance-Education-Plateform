const router = require('express').Router();
let activite = require('../models/activite.model'),
multer = require('multer'),
path=require('path')
 
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, './public/uploads');
},
filename: (req, file, cb) => {
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
});
var upload = multer({
  storage: storage,
  });

//affiche activites
router.route('/').get((req, res) => {
    activite.find().populate("nom_matiere").populate("nom_filiere").populate("nom_ens")
      .then(activites => res.json(activites))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
 //ajouter activite
 /*
  router.route('/addactivite').post((req, res) => {
    const nom_activite = req.body.nom_activite;
    const fichier = req.body.fichier;
    const type = req.body.type;
    const nom_matiere = req.body.nom_matiere;
    const nom_filiere= req.body.nom_filiere;
    const nom_ens = req.body.nom_ens;
    const description = req.body.description;
    

    const newActivite = new activite({
      nom_activite,
      fichier,
      type,
      nom_matiere,
      nom_filiere,
      nom_ens,
      description,
    });
  
    newActivite.save()
    .then(() => res.json('activite ajouter !'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  */
  router.post('/addactivite', upload.single('fichier'), (req, res, next) => {

    const newActivite = new activite({
    nom_activite: req.body.nom_activite,
    fichier: req.file.path,
    type_activite: req.body.type_activite,
    nom_matiere : req.body.nom_matiere,
    nom_filiere: req.body.nom_filiere,
    nom_ens: req.body.nom_ens,
    description: req.body.description,

    });
    newActivite.save().then(result => {
    res.status(201).json({
    message: "User registered successfully!",
    userCreated: {
    _id: result._id,
    fichier: result.fichier
    }
    })
    }).catch(err => {
    console.log(err),    console.log("prblemmmmm"),

    res.status(500).json({
    error: err
    });
    })
    });
    /*router.route('/download/:fichier').get((req, res) => {
    activite.findOne({fichier:req.params.fichier}).then(file => {
      var fileContents = Buffer.from(file.data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);
      
      res.set('Content-disposition', 'attachment; filename=' + file.name);
      res.set('Content-Type', file.type);

      readStream.pipe(res);
    })
  });
  app.get('/download', (req, res) => {
    // Check file exist on MongoDB

var filename = req.query.filename;    
  var readstream = gfs.createReadStream({ filename: filename });
  readstream.pipe(res);            
 
});  */
    
    router.route('/download/:fichier').get((req, res) => {
      try{
      var file = req.params.fichier;
      var fileLocation = path.join('./'+file);
      console.log(fileLocation);
      res.download(fileLocation, file);
      }
      catch(e){
        console.log(e)
      }
      });
      
  //recherche 
  router.route('/:id').get((req, res) => {
    activite.findById(req.params.id).populate("nom_matiere").populate("nom_filiere").populate("nom_ens")
      .then(activites => res.json(activites))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/findBymatiere/:nom_matiere').get((req, res) => {
    activite.find({nom_matiere:req.params.nom_matiere}).populate("nom_matiere").populate("nom_filiere").populate("nom_ens")
      .then(activites => res.json(activites))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    activite.findByIdAndDelete(req.params.id).populate("nom_matiere").populate("nom_filiere").populate("nom_ens")
      .then(() => res.json('activite supprimer'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/editactivite/:id').post((req, res) => {
    activite.findById(req.params.id).populate("nom_matiere").populate("nom_filiere").populate("nom_ens")
      .then(activite => {
        activite.nom_activite = req.body.nom_activite;
        activite.fichier = req.body.fichier;
        activite.type_activite = req.body.type_activite;
        activite.nom_matiere = req.body.nom_matiere;
        activite.nom_filiere = req.body.nom_filiere;
        activite.nom_ens = req.body.nom_ens;
        activite.description = req.body.description;
  
        activite.save()
          .then(() => res.json('activite modifier !'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;