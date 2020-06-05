const router = require('express').Router();
let admin = require('../models/admin.model');


router.route('/').get((req,res)=> {
    admin.find()
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error : '+err));
});


router.route('/addadmin').post((req,res)=>{
    const code_admin = req.body.code_admin;
    const password = req.body.password;

    const newAdmin = new admin({code_admin,password});

    newAdmin.save()
        .then(()=>res.json('Admin ajouté'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    admin.findById(req.params.id)
        .then(admins=>res.json(admins))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Admin.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Admin suprimé'))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/editadmin/:id').post((req,res)=>{
    admin.findById(req.params.id)
        .then(admin=>{
            admin.code_admin = req.body.code_admin;
            admin.password = req.body.password;

            admin.save()
                .then(()=>res.json('Admin modifie '))
                .catch(err=>res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
});


module.exports = router;