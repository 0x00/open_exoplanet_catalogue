exports.showjson = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);
	res.send(global.systemMap[encodeURI(name)]);
};

exports.showpage = function(req, res){
  name = req.param('systemname');
  console.log("Requested: "+name);
	
	ajax = req.param('ajax')
	if(ajax)
	  res.render('system_ajax', { system: global.systemMap[encodeURI(name)]});
	else
		res.render('system', { system: global.systemMap[encodeURI(name)]});
};
