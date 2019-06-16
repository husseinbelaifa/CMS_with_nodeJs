const express=require('express');
const HomeController=require('../../controllers/HomeController');
const AuthController=require('../../controllers/AuthController');
const router=express.Router();


router.all('/*',(req,res,next)=>{
	req.app.locals.layout='home';
	next();
})

router.get('/',HomeController.index);
router.get('/posts/:id',HomeController.show);




router.get('/about',(req,res)=>{

	res.render('home/about');

})

router.get('/login',AuthController.login);



router.get('/register',AuthController.register);

module.exports=router;