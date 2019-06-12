const  mongoose=require('mongoose');
// mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/cms')
.then(db=>{
	console.log('MONGO connected');
})
.catch(error=>console.log(error));
mongoose.Promise = global.Promise;
module.exports=mongoose;
