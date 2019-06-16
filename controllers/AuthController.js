const User=require('../models/User');
const bcrypt=require('bcryptjs');
const passport=require('../config/passportConfig');
module.exports.login=(req,res)=>{
    res.render('home/login');
}


module.exports.register=(req,res)=>{
    res.render('home/register');
}

module.exports.registerHandler=(req,res)=>{

    let errors=[];

    if(!req.body.firstName) errors.push({message:'please add a firstName'})
    if(!req.body.lastName) errors.push({message:'please add a lastName'})
    if(!req.body.email) errors.push({message:'please add a email'})
    if(!req.body.password) errors.push({message:'please add a password'})
    if(req.body.password!==req.body.passwordConfirm) errors.push({message:'password confirmation must equal to the password'})

    if(errors.length>0) res.render('home/register',{
        errors:errors,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
      
    });
    else{

        User.findOne({email:req.body.email}).then(user=>{
            if(user){
                req.flash('error_register',`Email exists`);
                res.redirect('/register');
            }else{

                const newUser=new User({

                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:req.body.password,
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                       
                        newUser.password=hash;
                        newUser.save().then(savedUser=>{
                        req.flash('success_register',`User ${savedUser.firstName} ${savedUser.lastName} was created successfully`)
                        res.redirect('/');
                })
                    })
                })
            
                
            }
        })
           

  

    

    }



}


module.exports.loginHandler=(req,res,next)=>{

    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true

    })(req,res,next);
    res.send('login post');
}