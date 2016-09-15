
module.exports = function(file,method){
	
	return require("../modules/controllers/"+file)(method);

}