const express=require('express');
const {userAuthenticated}=require('../../helpers/authentication');
const router=express.Router();



router.all('/*',userAuthenticated,(req,res,next)=>{
	req.app.locals.layout='admin';
	next();
})

router.get('/',(req,res)=>{

	console.log(req);

res.render('admin/index')
})


module.exports=router;