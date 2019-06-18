
// $('#comment_add').click(function (e) { 

//     console.log("clicked");
   
//     const postId = $(this).attr('data-id');
//     const userId = $(this).attr('data-userId');
//     const body=$('#body').val();
//     console.log("userId");
 
//   $.ajax({
//     type: "post",

//     url: `/posts/${postId.id}/comments/create`,
//     data: JSON.stringify({postId:postId,userId:userId,body:body}),
//     contentType:"application/json",

//     success:function(data){
//         console.log("clicked");
//         console.log(JSON.stringify(data));
//         toastr.success('comment was added wait to check by the author');
//         location.reload();
//     }
  
// })
    
// });


$("[name='approveComment']").bootstrapSwitch();
$("[name='allowComments']").bootstrapSwitch();
$(document).ready(function(){
  $("[name='approveComment']").on('switchChange.bootstrapSwitch',(event,data)=>{
    const commentId=$('#commentId').val();
    const postId=$('#postId').val();

    // console.log(postId);

    $.ajax({
      type: "post",
  
      url: `/admin/posts/${postId}/comments/edit/${commentId}?_method=PATCH`,
      data: JSON.stringify({postId:postId,commentId:commentId,status:data}),
      contentType:"application/json",
  
      success:function(data){
          console.log("clicked");
          console.log(JSON.stringify(data));


          toastr.success('Comment Updated');
  
          //fetch 
      }
    
  })

  })

  //for post

  $("[name='allowComments']").on('switchChange.bootstrapSwitch',(event,data)=>{
    
    const postId=$('#postId').val();

    console.log(postId);

    $.ajax({
      type: "post",
  
      url: `/admin/posts/allowComment/${postId}?_method=PATCH`,
      data: JSON.stringify({postId:postId,allowComments:data}),
      contentType:"application/json",
  
      success:function(data){
          console.log("clicked");
          console.log(JSON.stringify(data));


          toastr.success('Post Updated');
  
          //fetch 
      }
    
  })

  })
})

