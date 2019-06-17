const Post=require('../models/Post');
const Category=require('../models/Category');
const Comment=require('../models/Comment');
const moment=require('moment');
module.exports.index=(req,res)=>{

	Post.find().then(posts=>{
		 const newPostsWithDate= posts.map(post=>{
	   	
	   	  const {date,_id,...newPost}=post._doc;

	   	   return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
	   })


	   Category.find().then(categories=>{

		res.render('home/index',{posts:newPostsWithDate,categories:categories});

	   })



		 
	});


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
			
				res.render('home/posts/show',{comments:newPostWithCommentsAndUser.comments});
			
			})
		
	})

	
}