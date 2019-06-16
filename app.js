const express=require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');
const mongoose=require('./config/dbConfig');
const bodyParser=require('body-parser');
const {select}=require('./helpers/handlebars-helpers');
const methodOverride=require('method-override');
const upload=require('express-fileupload');
const home=require('./routes/home/index');
const admin=require('./routes/admin/index');
const posts=require('./routes/admin/posts');
const categories=require('./routes/admin/categories');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname,'public')))


app.engine('handlebars',exphbs({defaultLayout:'home', 
	helpers:{select:select}
	
}))
app.set('view engine','handlebars');

 app.use(upload());


 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(methodOverride('_method'));



app.use(session({
  secret: 'belaifahussein',
  resave: true,
  saveUninitialized: false,
  
}));




app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//locals variables

app.use((req,res,next)=>{
	res.locals.success_message=req.flash('success_message');
	next();
});

app.use((req,res,next)=>{
	res.locals.updated_message=req.flash('updated_message');
	next();
});

app.use((req,res,next)=>{
	res.locals.delete_message=req.flash('delete_message');
	next();
})

app.use((req,res,next)=>{

	res.locals.error_register=req.flash('error_register');
	next();

})


app.use((req,res,next)=>{

	res.locals.success_register=req.flash('success_register');
	next();

})


app.use((req,res,next)=>{
	res.locals.success_message=req.flash('success_message');
	next();
});

app.use((req,res,next)=>{
	res.locals.user=req.user || null;
	
		
	next();
})


app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);

app.listen(4500,()=>{
	console.log(`listening on port 4500`);
});