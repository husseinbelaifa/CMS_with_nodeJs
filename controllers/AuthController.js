const User=require('../models/User');
const bcrypt=require('bcryptjs');
const passport=require('../config/passportConfig');
module.exports.login=(req,res)=>{
    res.render('home/login');
}


module.exports.register=(req,res)=>{
    res.render('home/register');
}

module.exports.registerHandler=(req,res,next)=>{

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
                        passport.authenticate('local',{
                            successRedirect:'/',
                            failureRedirect:'/register',
                            failureFlash:true
                    
                        })(req,res,next);
                })
                    })
                })
            
                
            }
        })
           

  

    

    }



}

let  tokens = {}

function consumeRememberMeToken(token, fn) {
  var uid = tokens[token];
  delete tokens[token];
  return fn(null, uid);
}

function saveRememberMeToken(token, uid, fn) {
    tokens[token] = uid;
    return fn();
  }

function randomString (len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;
  
    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
  
    return buf.join('');
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function issueToken(user, done) {
    const  token = randomString(64);
    saveRememberMeToken(token, user.id, function(err) {
      if (err) return done(err); 
      return done(null, token);
    });
  }
  
module.exports.loginHandler=(req,res,next)=>{


    if (!req.body.remember_me) { return next(); }
    
    issueToken(req.user, function(err, token) {
        if (err) { return next(err); }
        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
        return next();
      });
 }


 module.exports.logout=(req,res,next)=>{
     req.logout();

     res.redirect('/login');
 }