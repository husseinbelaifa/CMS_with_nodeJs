const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const Schema=mongoose.Schema;

const UserSchema=new Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   

});



module.exports=mongoose.model('users',UserSchema);

