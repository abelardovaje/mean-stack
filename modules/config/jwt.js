var jwt = require('jsonwebtoken');
module.exports = {

	generate:function(){
		var expiry = new Date();
		expiry.setDate(expiry.getDate()+7);
		 return jwt.sign({
		    exp: parseInt(expiry.getTime() / 1000),
		  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
	}

}