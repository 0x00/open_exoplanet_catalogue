exports.index = function(req, res){
  res.render('index', { systems: global.systems });
};


exports.list = function(req, res){
  res.send(global.systems);
};
