const express=require('express');
const PostController=require('../../controllers/PostController')

const router=express.Router();

router.all('/*',(req,res,next)=>{
	req.app.locals.layout='admin';
	next();
})


router.get('/',PostController.index)
router.get('/create',PostController.create)
module.exports=router;