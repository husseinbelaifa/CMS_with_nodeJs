const express=require('express');
const HomeController=require('../../controllers/HomeController');
const AuthController=require('../../controllers/AuthController');
const router=express.Router();
const passport=require('../../config/passportConfig');

router.all('/*',(req,res,next)=>{
	req.app.locals.layout='home';
	next();
})

router.get('/',HomeController.index);
router.get('/posts/:id',HomeController.show);

router.post('/posts/:id/comments/create',HomeController.store);




router.get('/about',(req,res)=>{

	res.render('home/about');

})

router.get('/login',AuthController.login);
router.post('/login',
passport.authenticate('local',{
	failureRedirect:'/login',
	failureFlash:true

}),
AuthController.loginHandler, 
function(req, res) {
    res.redirect('/');
  }
  );


router.get('/register',AuthController.register);
router.post('/register',AuthController.registerHandler);

router.get('/logout',AuthController.logout);

module.exports=router;