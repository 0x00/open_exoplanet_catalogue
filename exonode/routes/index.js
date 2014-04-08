exports.index = function(req, res){
  res.render('index', { systems: global.systems });
};
