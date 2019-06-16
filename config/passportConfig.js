const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/User');

passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
    console.log(password);
    User.findOne({email:email}).then(user=>{
        if(!user) return done(null,false,{message:'Incorrect UserName or Password'});

        if(!user.validatePassword(password,user.password))  return done(null,false,{message:'Incorrect UserName or Password'});
        else return done(null,user);

       
    })
}) );

module.exports=passport;