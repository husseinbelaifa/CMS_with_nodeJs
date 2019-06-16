const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/User');
const bcrypt=require('bcryptjs');
passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
  
    User.findOne({email:email}).then(user=>{
        if(!user) return done(null,false,{message:'Incorrect UserName or Password'});

        bcrypt.compare(password,user.password,(err,matched)=>{
            if(!matched)return done(null,false,{message:'Incorrect UserName or Password'});
            else  return done(null,user);
        })

     

       
    })
}) );


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})

module.exports=passport;