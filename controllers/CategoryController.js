const Category=require('../models/Category');


module.exports.index=(req,res)=>{

	Category.find().then(categories=>{

		res.render('admin/categories/index',{categories:categories});
 
	})

	
}

module.exports.create=(req,res)=>{
	
	res.render('admin/categories/create');
}

module.exports.edit=(req,res)=>{
	
	Category.findOne({_id:req.params.id}).then(category=>{
		res.render('admin/categories/edit',{category:category});
	})
}




module.exports.store=(req,res)=>{

	// res.send('post request');

	let errors=[];

	if(!req.body.categoryName) errors.push({message:'Please add a category Name'});
	if(errors.length>0) res.render('/admin/categories/create',{errors:errors});
	
		const newCategory=new Category({
		categoryName:req.body.categoryName
	})

	newCategory.save().then(savedCategory=>{

		req.flash('success_message',`Category ${savedCategory.categoryName} was created Successfully`)
        res.redirect('/admin/categories');
	})
	

}

module.exports.update=(req,res)=>{

	let errors=[];

	if(!req.body.categoryName) errors.push({message:'Please add a category Name'});
	if(errors.length>0) res.render('admin/categories/edit',{errors:errors});

	else{

		Category.findOne({_id:req.params.id}).then(category=>{
		category.categoryName=req.body.categoryName;
		category.save().then(savedCategory=>{
           req.flash('updated_message',`Category ${savedCategory.categoryName} was updated `);
            res.redirect('/admin/categories');
		});
		
	})


	}

	
}

module.exports.destroy=(req,res)=>{

	Category.findOne({_id:req.params.id}).then(category=>{

		category.remove();

		res.redirect('/admin/categories');
	})
}