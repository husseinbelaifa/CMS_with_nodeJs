module.exports={
    userAuthenticated(req,res,next){
        if(!req.user 
            // || !req.user.isAdmin
            )   res.redirect('/login');
        else return next();
    }
}