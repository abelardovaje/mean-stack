var jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
	var token = req.headers['x-xsrf-token'];
	 // verifies secret and checks exp	
    jwt.verify(token, 'MY_SECRET', function(err, decoded) { 
    var ip = req.connection.remoteAddress;   
      console.log(req.get('Origin'));
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {      
        
        req.decoded = decoded;    
        next();
 
        
      }
    });
	
}