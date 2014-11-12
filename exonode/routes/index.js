exports.index = function(req, res){
  res.render('index', { systems: global.systems, bounds: JSON.stringify(bounds)  });
};


exports.list = function(req, res){
  res.send(global.systems);
};
