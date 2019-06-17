const express=require('express');
const CommentController=require('../../controllers/CommentController');
const {userAuthenticated}=require('../../helpers/authentication');
const router=express.Router();

router.all('/*',userAuthenticated,(req,res,next)=>{

    req.app.locals.layout='admin';
    next();
});

router.get('/',CommentController.index);

router.delete('/delete/:comment_id',CommentController.destroy);

module.exports=router;