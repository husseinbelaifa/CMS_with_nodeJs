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