exports.index = function(req, res){
  res.render('index', { systems: global.systems, bounds: JSON.stringify(bounds)  });
};

exports.listpage = function(req, res){
  res.render('list', {systems: global.systems});
};

exports.listjson = function(req, res){
  res.send(global.systems);
};
