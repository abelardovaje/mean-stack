module.exports = function(req,res,next){
			
			if(req.session.islogin1){
				res.redirect('/');
				return;
			}
			next();	

}