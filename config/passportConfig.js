const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const RememberMeStrategy=require('passport-remember-me').Strategy;
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

  function issueToken(user, done) {
    const  token = utils.randomString(64);
    saveRememberMeToken(token, user.id, function(err) {
      if (err) return done(err); 
      return done(null, token);
    });
  }
  

passport.use(new RememberMeStrategy((token,done)=>{
    consumeRememberMeToken(token,(err,uid)=>{
        if(err) return done(err);
        if(!uid) return done(null, false);

        User.findOne({_id:uid}).then(user=>{
            if(!user) return done(err);
            else return done(null,user);
        })
    })
 
},
issueToken
))


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})

module.exports=passport;