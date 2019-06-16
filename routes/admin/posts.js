const express=require('express');
const PostController=require('../../controllers/PostController')
const {userAuthenticated}=require('../../helpers/authentication');
const router=express.Router();

router.all('/*',userAuthenticated,(req,res,next)=>{
	req.app.locals.layout='admin';
	next();
})


router.get('/',PostController.index)
router.get('/create',PostController.create)
router.post('/create',PostController.store);
router.get('/edit/:id',PostController.edit);
router.patch('/edit/:id',PostController.update);
router.delete('/delete/:id',PostController.destroy);

router.post('/generate-fake-posts',PostController.faker);
module.exports=router;