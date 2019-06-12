const Post=require('../models/Post');
module.exports.index=(req,res)=>{
	res.render('admin/posts/index');
}


module.exports.create=(req,res)=>{
	res.render('admin/posts/create');
}

module.exports.store=(req,res)=>{

	const newPost=Post({
		title:req.body.title,
		status:req.body.status,
		allowComments:req.body.allowComments ? true : false,
		body:req.body.body
	});

     newPost.save().then(savedPost=>{
     	console.log(savedPost);
     	res.redirect('/admin/posts');
     }).catch(error=>{
     	console.log(error);
     });

	// res.render('admin/posts/create');
}