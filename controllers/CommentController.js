const Post=require('../models/Post');
const moment=require('moment');
const Comment=require('../models/Comment');
module.exports.index=(req,res)=>{

    Post.findOne(req.params.id).then(post=>{
        Post.populate(post,[{
            path:'comments',
            model:'comments',
            populate:{
            path:'ownerUser',
            model:'users'
        }
    }]).then(postWithComments=>{

        const comments=postWithComments.comments.map(comment=>{
            const {date,_id,...newComment}=comment._doc;
	
	
				   
            return {...newComment,id:_id,date:moment(date).format('MMMM Do YYYY , h:mm:ss a')};
        })
      
            // res.json(comments);
             res.render('admin/comments/index',{comments:comments});
        })
      
    })

   

}

// module.exports.create=(req,res)=>{

// }

module.exports.destroy=(req,res)=>{

    Comment.findOne({_id:req.params.comment_id}).then(comment=>{

        comment.remove();
        req.flash('delete_message',`Comment was deleted`);
        res.redirect('/admin/posts/{{comment.post}}/comments');
    })


}


module.exports.update=(req,res)=>{

   

    Comment.findOne({_id:req.body.commentId}).then(comment=>{

        // return res.json(comment);

        comment.status=req.body.status;
        comment.save().then(updatedComment=>{
            req.flash('updated_message',`Comment was Updated`);
            return res.json('comment was updated');
        });

    })


}