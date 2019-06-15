const Category=require('../models/Category');
const  hbs = require('express-hbs');
module.exports={

	select(selected,options){
		return options.fn(this).replace(new RegExp('value=\"'+selected+'\"'),'$&selected="selected"')
	}


	
}