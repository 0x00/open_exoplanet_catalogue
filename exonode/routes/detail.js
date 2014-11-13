exports.showjson = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);
	res.send(global.systemMap[encodeURI(name)]);
};

exports.showpage = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);
	res.render('system', { system: global.systemMap[encodeURI(name)]});
};
