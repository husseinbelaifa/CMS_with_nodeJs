const Post=require('../models/Post');
const Category=require('../models/Category');
const Comment=require('../models/Comment');
const moment=require('moment');
module.exports.index=(req,res)=>{

	

	Post.find().then(posts=>{


	   Category.find().then(categories=>{

		if(!req.query.category){

			Post.paginate({},{
				page:req.query.page ? req.query.page:1,
				limit:10,
				populate:[
							{path:'user',model:'users'},
							{path:'category',model:'categories'}
						
					]
			}).then(postsPaginated=>{

				// res.json(postsPaginated);
                const {nextPage,prevPage,...postsPaginatedModif}=postsPaginated
			

				const newPostsWithDate= postsPaginatedModif.docs.map(postPaginated=>{
	   	
					const {date,_id,...newPost}=postPaginated._doc;
	   
					 return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
			  })
			  res.render('home/index',{posts:newPostsWithDate,categories:categories,prevPage:prevPage,nextPage:nextPage,url:req.url,params:req.query.category});
			//   res.json(newPostsWithDate);
			})
			
		}else{

			Post.paginate({},{
				page:req.query.page ? req.query.page:1,
				limit:10,
				populate:[
									{path:'user',model:'users'},
	                     			{path:'category',model:'categories',match:{categoryName:req.query.category}}
						
					]
			}).then(postsPaginated=>{

				const {nextPage,prevPage,...postsPaginatedModif}=postsPaginated

				const newPostsWithDate= postsPaginatedModif.docs.map(postPaginated=>{
	   	
					const {date,_id,...newPost}=postPaginated._doc;
	   
					 return {...newPost,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
			  })
			  res.render('home/index',{posts:newPostsWithDate,categories:categories,prevPage:prevPage,nextPage:nextPage,url:req.url,params:req.query.category});

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