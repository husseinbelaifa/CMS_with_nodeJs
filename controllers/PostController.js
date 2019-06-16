const Post=require('../models/Post');
const Category=require('../models/Category');
const User=require('../models/User');
const Comment=require('../models/Comment');
const faker=require('faker');
const {isEmpty,uploadDir}=require('../helpers/upload-helpers');
const fs=require('fs');
const path=require('path');
const moment=require('moment');
const {unsplash}=require('../config/unsplashConfig');
const bcrypt=require('bcryptjs');
module.exports.index=(req,res)=>{

	if(!req.user.isAdmin){
		Post.find({user:req.user._id}).populate('category').then(posts=>{

			// console.log(posts);
			const newPostsWithDate= posts.map(post=>{
			   
				 const {date,_id,...newPost}=post._doc;
	
	
				   
				  return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
					  
		   })
	
			 console.log(newPostsWithDate);
	
		 res.render('admin/posts/index',{posts:newPostsWithDate});
		});
	
	}else{

		Post.find().populate('category').then(posts=>{

			// console.log(posts);
			const newPostsWithDate= posts.map(post=>{
			   
				 const {date,_id,...newPost}=post._doc;
	
	
				   
				  return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
					  
		   })
	
			 console.log(newPostsWithDate);
	
		 res.render('admin/posts/index',{posts:newPostsWithDate});
		});

	}


   
	

	 
}


module.exports.create=(req,res)=>{



    Category.find().then(categories=>{

     console.log(categories);

       res.render('admin/posts/create',{categories:categories});
    })
	
}

module.exports.edit=(req,res,id)=>{


   Post.findOne({_id:req.params.id}).populate('category').then(post=>{
   
      Category.find().then(categories=>{
        res.render('admin/posts/edit',{post:post,categories:categories});
      })
     
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

	Category.findOne({categoryName:req.body.category}).then(category=>{

		const newPost=new Post({
		title:req.body.title,
		status:req.body.status,
		allowComments:req.body.allowComments ? true : false,
		body:req.body.body,
		file:fileName,
		category:category._id
	});


		  newPost.save().then(savedPost=>{
     
     	req.flash('success_message',`Post ${savedPost.title} was created successfully`);
     	console.log('flashing messgae')
     	res.redirect('/admin/posts');
     }).catch(validator=>{


     	// res.render('admin/posts/create',{errors:validator.errors})
     	console.log(validator.errors);
     });


	})

	if(!req.body.category){
				const newPost=new Post({
		title:req.body.title,
		status:req.body.status,
		allowComments:req.body.allowComments ? true : false,
		body:req.body.body,
		file:fileName,
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

		Category.findOne({categoryName:req.body.category}).then(category=>{
			post.category=category._id;

			post.save().then(updatedPost=>{
			req.flash('updated_message',`Post ${updatedPost.title} was updated`);
			res.redirect('/admin/posts');
		});
		})

		if(!req.body.category){
			post.save().then(updatedPost=>{
			req.flash('updated_message',`Post ${updatedPost.title} was updated`);
			res.redirect('/admin/posts');
		});
		}

	
		

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

	
	

	for(let i=0;i<req.body.amount;i++){



		let post=new Post();
		post.title=faker.name.title();
		post.status=faker.random.arrayElement(['public','private','draft']);

		post.allowComments=faker.random.boolean();
		post.body=faker.lorem.sentence();
		 unsplash.get('/photos/random').then(response=>{
	 	
		 post.file=response.data.urls.regular;
		 
		 //generate random category

		  let category=new Category();
		  
       category.categoryName=faker.commerce.productName();
       category.save((err,savedCategory)=>{
	    if(err) throw err;
		post.category=savedCategory._id;
		//generate random user
		let user=new User({
			firstName:faker.name.firstName(),
			lastName:faker.name.lastName(),
			email:faker.internet.email(),
			password:'1234',
			isAdmin:faker.random.arrayElement([true,false])
		});

		console.log('terminated');

		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password,salt,(err,hash)=>{
			   
				user.password=hash;
				user.save((err,usersaved)=>{
					if(err) throw err;
					
					post.user=usersaved._id;

					post.save((err,postSaved)=>{
						if(err) throw err;
						//generate random comment

						for(let i=0;i<10;i++){

							let comment=new Comment({
								ownerUser:postSaved.user,
								post:postSaved._id,
								body:faker.lorem.paragraph()
							});

							comment.save((err,savedComment)=>{
								if(err) throw err;
								//update list of comment
	
								Post.findOne({_id:savedComment.post}).then(post=>{
									console.log(post);
									 post.comments.push(savedComment._id);
									post.save((err)=>{
										if(err) throw err;
									})
								})
							})

						}
						

					
					})
				});
				
			})
		})
		
	   
        
       });
 	
		
	 }).then(()=>console.log('finished'))
		 .catch(err=>console.log(err))
		
		


	}

	res.redirect('/admin/posts');

		
}