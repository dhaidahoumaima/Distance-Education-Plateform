const router = require('express').Router();
let etudiant = require('../models/etudiant.model');


router.route('/').post(async(req,res)=>{
 
        const cne = req.body.cne;
        //get user if exist
        const result = await etudiant.findOne({ cne }).populate("nom_filiere");
        console.log(result);
        if (!result) return res.status(400).json({ message: "username incorrect", ok: 0 });
        //const cne = result.cne;
        res.status(200).json({ id: result._id,cne:result.cne,nom_filiere:result.nom_filiere._id,ok: 1 });
   
});

module.exports = router;
