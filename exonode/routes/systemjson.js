exports.show = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);
	res.send(global.systemMap[name]);
};
