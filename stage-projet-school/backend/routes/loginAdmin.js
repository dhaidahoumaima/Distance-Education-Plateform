const router = require('express').Router();
let admin = require('../models/admin.model');

router.route('/').post(async(req,res)=>{
 
        const code_admin = req.body.code_admin;
        //get user if exist
        const result =await admin.findOne({ code_admin });
        console.log(result);
        if (!result) return res.status(400).json({ message: "username  incorrect", ok: 0 });
      
       
        res.status(200).json({ id: result._id,code_admin:result.code_admin,ok: 1 });
   
});

module.exports = router;
