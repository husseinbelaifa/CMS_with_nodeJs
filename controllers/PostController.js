const Post=require('../models/Post');
const faker=require('faker');
const {isEmpty,uploadDir}=require('../helpers/upload-helpers');
const fs=require('fs');
const path=require('path');
const moment=require('moment');
const {unsplash}=require('../config/unsplashConfig');

module.exports.index=(req,res)=>{
	Post.find().then(posts=>{

	   const newPostsWithDate= posts.map(post=>{
	   	
	   	  const {date,_id,...newPost}=post._doc;

	   	   return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
	   })

     res.render('admin/posts/index',{posts:newPostsWithDate});
	});
}


module.exports.create=(req,res)=>{


	res.render('admin/posts/create');
}

module.exports.edit=(req,res,id)=>{


   Post.findOne({_id:req.params.id}).then(post=>{
   	console.log(post.allowComments);

      res.render('admin/posts/edit',{post:post});
   })

	
}


module.exports.store=(req,res)=>{

    let errors=[];
	if(!req.body.title){
      errors.push({message:'Please add a title'})
	}

	

	if(!req.body.body){
      errors.push({message:'Please add a Body'})
	}

	if(errors.length>0) 
		res.render('admin/posts/create',{errors:errors});

	

    let fileName='';
    unsplash.get('/photos/random').then(response=>{
	 	
	 	fileName=response.data.urls.full;
	}).then(()=>console.log('finished'))
		 .catch(err=>console.log(err))
	if(!isEmpty(req.files)){

	  let file=req.files.file;
	  fileName=Date.now()+'-'+file.name;
	  console.log('file name is'+fileName);

	file.mv(`./public/uploads/${fileName}`,err=>{
		if(err) throw err;
	})

	fileName=`/uploads/${fileName}`
     
	}

	
	const newPost=new Post({
		title:req.body.title,
		status:req.body.status,
		allowComments:req.body.allowComments ? true : false,
		body:req.body.body,
		file:fileName
	});

     newPost.save().then(savedPost=>{
     
     	req.flash('success_message',`Post ${savedPost.title} was created successfully`);
     	console.log('flashing messgae')
     	res.redirect('/admin/posts');
     }).catch(validator=>{


     	// res.render('admin/posts/create',{errors:validator.errors})
     	console.log(validator.errors);
     });

	
}


module.exports.update=(req,res)=>{

	Post.findOne({_id:req.params.id}).then(post=>{

		post.title=req.body.title;
		post.status=req.body.status;
		post.allowComments=req.body.allowComments ? true : false;
		post.body=req.body.body;

		 let fileName='';
		 unsplash.get('/photos/random').then(response=>{
	 	
	 	fileName=response.data.urls.regular;
	}).then(()=>console.log('finished'))
		 .catch(err=>console.log(err))
	if(!isEmpty(req.files)){

	  let file=req.files.file;
	  let fileName=file.name;
	  post.file=`/uploads/${fileName}`;

	file.mv(`./public/uploads/${fileName}`,err=>{
		if(err) throw err;
	})
     
	}

	post.save().then(updatedPost=>{
			req.flash('updated_message',`Post ${updatedPost.title} was updated`);
			res.redirect('/admin/posts');
		});
		

	})

}

module.exports.destroy=(req,res)=>{


    Post.findOne({_id:req.params.id})
    .then(post=>{
      fs.unlink(uploadDir+post.file,err=>{


	req.flash('delete_message',`Post ${post.title} was deleted`);

      	post.remove();

		res.redirect('/admin/posts');

	
      })
    })
	

}

module.exports.faker=(req,res)=>{

	
 // unsplash.get('/photos/random').then(response=>{
 	// console.log('unsplash');
 	// console.log(response.data.urls.full);
	 	
	 // 	// post.file=response.data.urls.full;
	 // })
	

	for(let i=0;i<req.body.amount;i++){

		let post=new Post();
		post.title=faker.name.title();
		post.status=faker.random.arrayElement(['public','private','draft']);

		post.allowComments=faker.random.boolean();
		post.body=faker.lorem.sentence();
		 unsplash.get('/photos/random').then(response=>{
	 	
	 	post.file=response.data.urls.regular;
	 	console.log(response.data.urls.regular);
	 	post.save(err=>{
			if(err) throw err;
		})
		
	 }).then(()=>console.log('finished'))
		 .catch(err=>console.log(err))
		
		


	}

	res.redirect('/admin/posts');

		
}