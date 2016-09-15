module.exports = function (method){

	var methods = {

		index:index,
		create:create,
		store:store

	};

	return methods[method]();

	function index(){
			
			return function (req,res){
				res.send('home');
			}

	}

	function create(){

			return function(req,res){
				res.send('create');
			}

	}

	function store(){

		return function (req,res){
			res.send('store');
		}

	}
	
}