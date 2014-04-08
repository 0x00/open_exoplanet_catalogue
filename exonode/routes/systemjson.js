exports.show = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);

  try{
 	 content = global.read(global.path+name+".xml"); 
 	 global.parsecall(content, function(system){
	    console.log(system);
	 		res.send(system);
	  });
	}catch(e){
		res.send("not found");
	}
  
};
