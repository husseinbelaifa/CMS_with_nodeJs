const  mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/cms',{useMongoClient:true})
.then(db=>{
	console.log('MONGO connected');
})
.catch(error=>console.log(error));

module.exports=mongoose;
