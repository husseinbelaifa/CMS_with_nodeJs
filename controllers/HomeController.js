const Post=require('../models/Post');
const Category=require('../models/Category');
const Comment=require('../models/Comment');
const moment=require('moment');
module.exports.index=(req,res)=>{

	console.log('categories');
	console.log(req.query.Category);

	Post.find().then(posts=>{
		 const newPostsWithDate= posts.map(post=>{
	   	
	   	  const {date,_id,...newPost}=post._doc;

	   	   return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
	   })


	   Category.find().then(categories=>{

		if(!req.query.category){
			// console.log('koko enter');
			Post.paginate({},2, 10).then(result=>{
				console.log(result)
			})
		// 	Post.populate(newPostsWithDate,[
		// 		{path:'user',model:'users'},
		// 		{path:'category',model:'categories'}
			
		// ]).then(newPostsWithDateAndUser=>{
	
			
			
		// 	// res.json(newPostsWithDateAndUser)
		
		// 	// res.render('home/index',{posts:newPostsWithDateAndUser,categories:categories});
			
			
		// 	})
	
		}else{

			Post.populate(newPostsWithDate,[
				{path:'user',model:'users'},
				{path:'category',model:'categories',match:{categoryName:req.query.category}}
			
		]).then(newPostsWithDateAndUser=>{
	
		

			const newPostsWithDateAndUserWithNotNullCategory=newPostsWithDateAndUser.filter(newpostwithdataanduser=>newpostwithdataanduser.category!==null);
	
			res.render('home/index',{posts:newPostsWithDateAndUserWithNotNullCategory,categories:categories});
			
			
			})

		}

		



		

	   })



		 
	});


}

module.exports.store=(req,res)=>{

	let comment=new Comment({
		ownerUser:req.user._id,
		post:req.params.id,
		body:req.body.body
	});

	comment.save().then(savedComment=>{
		//update list of comment 

		Post.findOne({_id:savedComment.post}).then(post=>{
			post.comments.push(savedComment._id);
			post.save();
		
			req.flash('success_message','comment was added pls wait for the author approval');
		    res.redirect(`/posts/${post._id}`);
		})

	})

	





}

module.exports.show=(req,res)=>{


	Post.findOne({_id:req.params.id}).then(post=>{
		 const {date,_id,...newPost}=post._doc;
		 
		
	

			const newPostWithDate={...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
			

			Post.populate(newPostWithDate,[{
				path:'comments',
				populate: {
				path: 'ownerUser',
				model: 'users'
			  },
			  
			},
			{
				path:'user',
				model:'users'
			}]).then(newPostWithCommentsAndUser=>{

				// res.json(newPostWithCommentsAndUser);

				Category.find().then(categories=>{
					res.render('home/posts/show',{post:newPostWithCommentsAndUser,categories:categories});
				})
			
			
			
			})
		
	})

	
}