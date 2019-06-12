const Post=require('../models/Post');


module.exports.index=(req,res)=>{
	Post.find().then(posts=>{
res.render('admin/posts/index',{posts:posts});
	});
}


module.exports.create=(req,res)=>{


	res.render('admin/posts/create');
}

module.exports.edit=(req,res,id)=>{


console.log(req.params.id);

   Post.findOne({_id:req.params.id}).then(post=>{
   	console.log(post.allowComments);
      res.render('admin/posts/edit',{post:post});
   })

	
}


module.exports.store=(req,res)=>{

	const newPost=new Post({
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

	
}


module.exports.update=(req,res)=>{

	Post.findOne({_id:req.params.id}).then(post=>{

		post.title=req.body.title;
		post.status=req.body.status;
		post.allowComments=req.body.allowComments ? true : false;
		post.body=req.body.body;

		post.save().then(updatedPost=>{
			console.log('updated Post');
			res.redirect('/admin/posts');
		});
		

	})

}

module.exports.destroy=(req,res)=>{

}