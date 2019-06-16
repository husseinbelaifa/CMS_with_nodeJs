const User=require('../models/User');

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

    if(errors.length>0) res.render('home/register',{errors:errors});
    else{
            const newUser=new User({

        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
    });

    newUser.save().then(savedUser=>{
       res.send('user was saved');
    })

    }



}


module.exports.loginHandler=(req,res)=>{
    res.send('login post');
}