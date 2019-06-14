const Post=require('../models/Post');
const moment=require('moment');
module.exports.index=(req,res)=>{

	Post.find().then(posts=>{
		 const newPostsWithDate= posts.map(post=>{
	   	
	   	  const {date,_id,...newPost}=post._doc;

	   	   return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
	   })

		 	res.render('home/index',{posts:newPostsWithDate});
	});


}

module.exports.show=(req,res)=>{


	Post.findOne({_id:req.params.id}).then(post=>{
		 const {date,_id,...newPost}=post._doc;

	   	 const newPostWithDate={...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
	   	 // res.json(newPostWithDate);
       res.render('home/posts/show',{post:newPostWithDate});
	})

	
}