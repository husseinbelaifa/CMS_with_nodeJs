
$('#comment_add').click(function (e) { 

    console.log("clicked");
   
    const postId = $(this).attr('data-id');
    const userId = $(this).attr('data-userId');
    const body=$('#body').val();
    console.log("userId");
 
  $.ajax({
    type: "post",

    url: `/posts/${postId.id}/comments/create`,
    data: JSON.stringify({postId:postId,userId:userId,body:body}),
    contentType:"application/json",

    success:function(data){
        console.log("clicked");
        console.log(JSON.stringify(data));

        //fetch 
    }
  
})
    
});

