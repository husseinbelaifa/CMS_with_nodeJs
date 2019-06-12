
module.exports.index=(req,res)=>{
	res.render('admin/posts/index');
}


module.exports.create=(req,res)=>{
	res.render('admin/posts/create');
}

module.exports.store=(req,res)=>{

	res.send('it is working')
	// res.render('admin/posts/create');
}