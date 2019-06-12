const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');
const mongoose=require('./config/dbConfig');
const bodyParser=require('body-parser');
const {select}=require('./helpers/handlebars-helpers');
const methodOverride=require('method-override');

app.use(express.static(path.join(__dirname,'public')))


app.engine('handlebars',exphbs({defaultLayout:'home', 
	helpers:{select:select}
	
}))
app.set('view engine','handlebars');


 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(methodOverride('_method'));

const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');

app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);

app.listen(4500,()=>{
	console.log(`listening on port 4500`);
});