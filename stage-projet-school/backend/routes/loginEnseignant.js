const router = require('express').Router();
let enseignant = require('../models/enseignant.model');


router.route('/').post(async(req,res)=>{
 
        const code_ens = req.body.code_ens;
        const result = await enseignant.findOne({ code_ens });
        console.log(result);
        if (!result) return res.status(400).json({ message: "username incorrect", ok: 0 });
      
        
        res.status(200).json({ id: result._id,code_ens:result.code_ens,ok: 1 });
   
});

module.exports = router;
