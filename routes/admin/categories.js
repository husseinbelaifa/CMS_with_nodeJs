const express=require('express');
const CategoryController=require('../../controllers/CategoryController');
const router=express.Router();

router.all('/*',(req,res,next)=>{
	req.app.locals.layout='admin';
	next();
});

router.get('/',CategoryController.index);

router.get('/create',CategoryController.create);
router.get('/edit/:id',CategoryController.edit);

router.post('/create',CategoryController.store);
router.patch('/edit/:id',CategoryController.update);
router.delete('/delete/:id',CategoryController.destroy);
module.exports=router;