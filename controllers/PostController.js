const Post=require('../models/Post');
const faker=require('faker');
const {isEmpty}=require('../helpers/upload-helpers');
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

	

    let fileName='61425643_2790248260991905_3044304761076580352_n.jpg';
	if(!isEmpty(req.files)){

	  let file=req.files.file;
	  let fileName=`${Date.now()}-${file.name}`;

	file.mv(`./public/uploads/${fileName}`,err=>{
		if(err) throw err;
	})
     
	}

	
	const newPost=new Post({
		title:req.body.title,
		status:req.body.status,
		allowComments:req.body.allowComments ? true : false,
		body:req.body.body,
		file:fileName
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


	Post.remove({_id:req.params.id}).then(result=>{

		res.redirect('/admin/posts');

	});

}

module.exports.faker=(req,res)=>{

	 // res.send(faker.random.boolean());

	for(let i=0;i<req.body.amount;i++){

		let post=new Post();
		post.title=faker.name.title();
		post.status=faker.random.arrayElement(['public','private','draft']);

		post.allowComments=faker.random.boolean();
		post.body=faker.lorem.sentence();

console.log(post);
		post.save(err=>{
			if(err) throw err;
		})


	}

		res.redirect('/admin/posts');
}