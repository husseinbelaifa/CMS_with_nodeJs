const  mongoose=require('mongoose');
// mongoose.Promise=global.Promise;


if(process.env.MONGODB_URL){
	mongoose.connect(process.env.MONGODB_URL)
		.then(db=>{
			console.log('MONGO connected FROM DOCKER');
		})
}else mongoose.connect('mongodb://localhost:27017/cms')
.then(db=>{
	console.log('MONGO connected');
})
.catch(error=>console.log(error));
mongoose.Promise = global.Promise;
module.exports=mongoose;
