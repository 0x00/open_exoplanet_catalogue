exports.index = function(req, res){
  res.render('index', { systems: global.systems, bounds: JSON.stringify(bounds)  });
};

exports.listpage = function(req, res){
  res.render('list', {systems: global.systems});
};

exports.listjson = function(req, res){
  pagesize = bounds.sysperpage;
	page = req.params.page;
  res.send(global.systems.slice(page*pagesize,(page+1)*pagesize));
};
