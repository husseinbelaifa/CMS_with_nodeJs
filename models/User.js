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

UserSchema.methodes.validatePassword=(password,userPassword)=>{

    bcrypt.compare(password,userPassword,(err,matched)=>{
        if(err) throw err;
        return matched;
    })

}

module.exports=mongoose.model('users',UserSchema);

