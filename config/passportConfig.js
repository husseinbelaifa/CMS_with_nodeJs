const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
    console.log(password);
}) );

module.exports=passport;